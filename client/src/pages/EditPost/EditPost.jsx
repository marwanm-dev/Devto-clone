import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import SimpleMDE from 'react-simplemde-editor';
import RouteWrapper from '../../common/RouteWrapper';
import LoadingSpinner from '../../common/LoadingSpinner';
import NotFound from '../../common/NotFound';
import Error from '../../common/Error';
import useBase64 from '../../hooks/useBase64';
import 'easymde/dist/easymde.min.css';
import { useUpdatePostMutation } from '../../core/features/posts/postsApiSlice';
import { useDeletePostMutation } from '../../core/features/posts/postsApiSlice';
import { getPost } from '../../core/features/posts/postsSlice';
import { selectCurrentUser } from '../../core/features/auth/authSlice';

const EditPost = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [isTagsFocused, setIsTagsFocused] = useState(false);
  const [inputsFilled, setInputsFilled] = useState(false);
  const filePickerRef = useRef();
  const titleRef = useRef();
  const previewURL = useBase64(file);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { username, postUrl } = useParams();
  const [updatePost, { isLoading: updateIsLoading, isError }] = useUpdatePostMutation();
  const [deletePost, { isLoading: deletionIsLoading }] = useDeletePostMutation();

  useEffect(() => titleRef.current?.focus(), []);

  useEffect(() => {
    const fetchPost = async () => {
      const { payload: post } = await dispatch(getPost(`${username}/${postUrl}`));
      setId(post._id);
      setPublicId(post.image?.publicId);
      setTitle(post.title);
      setFile(post.image?.url);
      setBody(post.body);
      setTags(post.tags);
    };

    fetchPost();
  }, []);

  useEffect(() => {
    if (title && file && body && tags) setInputsFilled(true);
    else setInputsFilled(false);
  }, [title, file, body, tags]);

  const handleDeletion = async () => {
    try {
      await deletePost({
        url: `${username}/${postUrl}`,
        id,
        publicId,
      });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (inputsFilled) {
      try {
        await updatePost({
          meta: {
            url: `${username}/${postUrl}`,
            id,
          },
          data: {
            title,
            body,
            file,
            tags,
            authorUsername: username,
            image: { url: previewURL, publicId },
          },
        }).unwrap();

        setTitle('');
        setFile('');
        setBody('');
        setTags('');

        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <RouteWrapper>
      {username === currentUser.username ? (
        <Wrapper>
          {(updateIsLoading || deletionIsLoading) && <LoadingSpinner />}
          {!updateIsLoading && !deletionIsLoading && (
            <NewPostWrapper>
              <Heading>Edit post</Heading>
              <InputWrapper>
                <Label htmlFor='title'>Title</Label>
                <Input
                  ref={titleRef}
                  id='title'
                  value={title}
                  onBlur={e => setTitle(prev => prev.trim())}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type='file'
                  ref={filePickerRef}
                  onChange={e => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  required
                />
                <ImagePreview src={previewURL.toString()} alt='Please pick an image' />
                <Button onClick={() => filePickerRef.current.click()}>Choose image</Button>
              </InputWrapper>
              <InputWrapper>
                <SimpleMDE value={body} onChange={setBody} required />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor='tags'>
                  Tags
                  {isTagsFocused && (
                    <Span>Tags separated by commas, word by either dashes or underscores</Span>
                  )}
                </Label>
                <Input
                  id='tags'
                  value={tags}
                  onFocus={() => setIsTagsFocused(true)}
                  onBlur={() => setIsTagsFocused(false)}
                  onChange={e => setTags(e.target.value)}
                  required
                />
              </InputWrapper>
              <Submit onClick={handleSubmit}>Submit</Submit>
              {isError && <Error>Something went wrong.</Error>}
              {!inputsFilled && <Error>All inputs must be filled.</Error>}
              <DeletePost onClick={handleDeletion}>Delete post</DeletePost>
            </NewPostWrapper>
          )}
        </Wrapper>
      ) : (
        <NotFound />
      )}
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-full text-sm`;

const DeletePost = tw(Submit)`hover:(bg-red text-white)`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const Span = tw.p`inline ml-sm`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const NewPostWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default EditPost;
