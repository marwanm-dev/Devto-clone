import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twin.macro';
import SimpleMDE from 'react-simplemde-editor';
import RouteWrapper from '../../common/RouteWrapper';
import LoadingSpinner from '../../common/LoadingSpinner';
import Error from '../../common/Error';
import useBase64 from '../../hooks/useBase64';
import { useCreatePostMutation } from '../../core/features/posts/postsApiSlice';
import 'easymde/dist/easymde.min.css';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import useRequireAuth from '../../hooks/useRequireAuth';
import { useContext } from 'react';
import socketContext from '../../context/SocketContext';
import { useGetUserDashboardQuery } from '../../core/features/users/usersApiSlice';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isTagsFocused, setIsTagsFocused] = useState(false);
  const [inputsFilled, setInputsFilled] = useState(false);
  const filePickerRef = useRef();
  const titleRef = useRef();
  const [createPost, { isLoading, isError }] = useCreatePostMutation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const previewURL = useBase64(file);
  const { isAuthed, handleAuth } = useRequireAuth();
  const { socket } = useContext(socketContext);
  const { data: user } = useGetUserDashboardQuery(currentUser.username);

  useEffect(() => titleRef.current.focus(), []);

  useEffect(() => {
    if (title && file && body && tags) setInputsFilled(true);
    else setInputsFilled(false);
  }, [title, file, body, tags]);

  const handleSubmit = async () => {
    if (inputsFilled) {
      if (isAuthed) {
        socket.emit('post', { sender: currentUser, receivers: user?.followers });
        try {
          await createPost({
            title,
            file: previewURL,
            body,
            tags,
            authorUsername: currentUser.username,
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
    <RouteWrapper>
      <Wrapper>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <NewPostWrapper>
            <Heading>Create a new post</Heading>
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
          </NewPostWrapper>
        )}
      </Wrapper>
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-full text-sm`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const Span = tw.p`inline ml-sm`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const NewPostWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default NewPost;
