import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import {
  useGithubLoginMutation,
  useGoogleLoginMutation,
  useLoginMutation
} from '../../core/features/auth/authApiSlice';
import { setCredentials, setOAuthed, setToken } from '../../core/features/auth/authSlice';
import Github from './components/Github';
// import Google from './components/Google';

const OAuth = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [githubLogin] = useGithubLoginMutation();
  const navigate = useNavigate();

  const handleOAuth = async oAuthData => {
    const {
      data: { email, username },
    } = oAuthData.tokenId
      ? await googleLogin(oAuthData.tokenId)
      : await githubLogin(oAuthData.code);
    try {
      const {
        data: {
          id,
          name,
          picture,
          bio,
          location,
          education,
          work,
          availableFor,
          skills,
          createdAt,
          token,
        },
      } = await login({
        email,
        pwd: email + username + email,
      });
      dispatch(
        setCredentials({
          id,
          name,
          username,
          email,
          picture,
          bio,
          location,
          education,
          work,
          availableFor,
          skills,
          createdAt,
        })
      );
      dispatch(setToken(token));

      navigate('/');
      dispatch(setOAuthed(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {/* <Google onLogin={handleOAuth} /> */}
      <Github onLogin={handleOAuth} />
    </Wrapper>
  );
};

const Wrapper = tw.div`[&>*:not(:last-child)]:mb-2 flex flex-col items-center justify-center`;

export default OAuth;
