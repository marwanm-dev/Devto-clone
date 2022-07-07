import tw from 'twin.macro';
import { useState, useEffect, useRef } from 'react';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RouteWrapper from '../../common/RouteWrapper';
import { useLoginMutation } from '../../core/features/auth/authApiSlice';
import { setRegisteredCredentials } from '../../core/features/auth/authSlice';
import Auth0 from '../../common/Auth0';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');

  const emailRef = useRef(null);

  const [login, { isError }] = useLoginMutation();

  useEffect(() => emailRef.current.focus(), []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = await login({ email, pwd }).unwrap();

      setEmail('');
      setPwd('');

      const decoded = jwt(payload.token);
      dispatch(
        setRegisteredCredentials({
          id: payload.id,
          username: decoded.username,
          email,
          picture: payload.picture,
          bio: payload.bio,
          location: payload.location,
          education: payload.education,
          work: payload.work,
          availableFor: payload.availableFor,
          skills: payload.skills,
          token: payload.token,
          expirationDate: payload.expirationDate,
          joinDate: payload.joinDate,
        })
      );

      !isError && navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Welcome to DEV Community</Heading>
        <Paragraph>DEV Community is a community of 748,239 amazing developers</Paragraph>

        <Auth0 />

        <Paragraph>Or</Paragraph>

        <Title>Login using an Existing account</Title>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor='email'>Email *</Label>
            <Input
              ref={emailRef}
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor='password'>Password *</Label>
            <Input
              type='password'
              name='password'
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              required
            />
          </InputContainer>

          {isError && <Error>Check your email and password</Error>}

          <Submit>Log in</Submit>
        </form>
      </Wrapper>
    </RouteWrapper>
  );
};

const Error = tw.h4`text-red mb-4`;

const Submit = tw.button`bg-blue text-white py-2  w-full rounded-lg`;

const Heading = tw.h1`font-bold my-6`;

const Title = tw.h2`my-6`;

const Paragraph = tw.p`my-4`;

const InputContainer = tw.div`text-left mb-8`;

const Label = tw.label`block mb-2`;

const Input = tw.input`outline-none rounded-lg border border-solid border-light-gray w-full py-2 px-3 focus:border-blue`;

const Wrapper = tw.div`bg-white text-center max-w-2xl mx-auto py-12 px-10 rounded-md`;

export default Login;
