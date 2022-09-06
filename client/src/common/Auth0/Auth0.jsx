import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import {
  useGoogleLoginMutation,
  useGithubLoginMutation,
  useLoginMutation,
} from '../../core/features/auth/authApiSlice';
import { setCredentials, setToken } from '../../core/features/auth/authSlice';
// import Facebook from './components/Facebook';
import Github from './components/Github';
import Google from './components/Google';

const Auth0 = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [githubLogin] = useGithubLoginMutation();
  const navigate = useNavigate();

  const handleGoogleAuth = async googleData => {
    const { data: user } = await googleLogin(googleData.tokenId);

    const payload = await login({
      email: user.email,
      pwd: user.email + user.email.slice(0, user.email.indexOf('@')) + user.email,
    }).unwrap();
    const decoded = jwt(payload?.token);

    dispatch(
      setCredentials({
        id: payload.id,
        name: payload.name,
        username: decoded.username,
        email: user.email,
        picture: payload.picture,
        bio: payload.bio,
        location: payload.location,
        education: payload.education,
        work: payload.work,
        availableFor: payload.availableFor,
        skills: payload.skills,
        createdAt: payload.createdAt,
      })
    );
    dispatch(setToken(payload.token));
    navigate('/');
  };
  const handleGithubAuth = async githubData => {
    const data = await githubLogin(githubData.code);
    console.log(data);
    // const payload = await login({
    //   email: user.email,
    //   pwd: user.email + user.email.slice(0, user.email.indexOf('@')) + user.email,
    // }).unwrap();
    // const decoded = jwt(payload?.token);

    // dispatch(
    //   setCredentials({
    //     id: payload.id,
    //     name: payload.name,
    //     username: decoded.username,
    //     email: user.email,
    //     picture: payload.picture,
    //     bio: payload.bio,
    //     location: payload.location,
    //     education: payload.education,
    //     work: payload.work,
    //     availableFor: payload.availableFor,
    //     skills: payload.skills,
    //     createdAt: payload.createdAt,
    //   })
    // );
    // dispatch(setToken(payload.token));
    // navigate('/');
  };
  return (
    <Wrapper>
      <Google onLogin={handleGoogleAuth} />
      <Github onLogin={handleGithubAuth} />
      {/* <Facebook /> */}
    </Wrapper>
  );
};

const Wrapper = tw.div`[&>*:not(:last-child)]:mb-sm`;

const Button = tw.button`rounded-md flex items-center justify-center gap-sm w-full py-4 px-6 [&:nth-of-type(1)]:(bg-lighter-gray text-black [&>*]:text-black) text-white [&:nth-of-type(2)]:bg-black [&:nth-of-type(3)]:bg-[#4065B5] [&:nth-of-type(4)]:bg-[#0e76a8] [&>*]:(text-lg text-white)`;

export default Auth0;
