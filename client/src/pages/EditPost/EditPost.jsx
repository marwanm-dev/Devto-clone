import 'easymde/dist/easymde.min.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import tw from 'twin.macro';
import Error from '../../common/Error';
import LoadingSpinner from '../../common/LoadingSpinner';
import NotFound from '../../common/NotFound';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from '../../core/features/posts/postsApiSlice';
import useBase64 from '../../hooks/useBase64';
import useRequireAuth from '../../hooks/useRequireAuth';

const EditPost = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { username, postUrl } = useParams();

  const { data: post, isLoading: postIsLoading } = useGetPostQuery(
    { url: `${username}/${postUrl}` },
    { refetchOnMountOrArgChange: true }
  );
  const [updatePost, { isLoading: updateIsLoading, isError }] = useUpdatePostMutation();
  const [deletePost, { isLoading: deletionIsLoading }] = useDeletePostMutation();

  const [id, setId] = useState(post?.id);
  const [publicId, setPublicId] = useState(post?.image?.publicId);
  const [title, setTitle] = useState(post?.title);
  const [file, setFile] = useState(post?.image?.url);
  const [body, setBody] = useState(post?.body);

  const [tags, setTags] = useState(post?.tags.map(tag => tag.name).join(', '));

  const [isTagsFocused, setIsTagsFocused] = useState(false);
  const [inputsFilled, setInputsFilled] = useState(false);

  const filePickerRef = useRef();
  const titleRef = useRef();
  const previewURL = useBase64(file);
  const navigate = useNavigate();
  const { isAuthed } = useRequireAuth();

  useEffect(() => {
    setId(post?.id);
    setPublicId(post?.image?.publicId);
    setTitle(post?.title);
    setFile(post?.image?.url);
    setBody(post?.body);
    setTags(post?.tags.map(tag => tag.name).join(', '));
  }, [post]);

  useEffect(() => titleRef.current?.focus(), []);

  useEffect(() => {
    if (title && file && body && tags) setInputsFilled(true);
    else setInputsFilled(false);
  }, [title, file, body, tags]);

  const handleDeletion = async () => {
    if (isAuthed) {
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
    } else handleAuth();
  };

  const handleUpdate = async () => {
    if (inputsFilled) {
      if (isAuthed) {
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
      } else handleAuth();
    }
  };

  return (
    !postIsLoading &&
    post && (
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
                    onBlur={() => setTitle(prev => prev?.trim())}
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
                    onChange={e => setTags(e.target.value.replace(/ /g, ''))}
                    required
                  />
                </InputWrapper>
                <Submit onClick={handleUpdate}>Submit</Submit>
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
    )
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

const NewPostWrapper = tw.div`bg-white w-3/5 mob:(w-full px-4) mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default EditPost;
