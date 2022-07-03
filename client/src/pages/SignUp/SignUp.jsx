import tw from 'twin.macro';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteWrapper from '../../common/RouteWrapper';
import { useSignUpMutation } from '../../core/features/auth/authApiSlice';
import Auth0 from '../../common/Auth0';
import useBase64 from '../../hooks/useBase64';

const SignUp = () => {
  const navigate = useNavigate();

  const [inputsAreValid, setInputsAreValid] = useState(false);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');
  const filePickerRef = useRef();

  const [validUser, setValidUser] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const userRef = useRef(null);

  const [signUp, { isError }] = useSignUpMutation();

  useEffect(() => userRef.current.focus(), []);

  useEffect(() => setValidUser(USER_REGEX.test(user)), [user]);

  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);

  useEffect(() => setValidPwd(PWD_REGEX.test(pwd)), [pwd]);

  const pictureURL = useBase64(file);

  useEffect(
    () => setInputsAreValid(validUser && validEmail && validPwd),
    [validUser, validEmail, validPwd]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (inputsAreValid && !isError) {
      try {
        await signUp({
          user,
          email,
          pwd,
          picture: pictureURL,
        }).unwrap();

        setUser('');
        setEmail('');
        setPwd('');

        navigate('/auth/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Welcome to DEV Community</Heading>
        <Paragraph>DEV Community is a community of 748,239 amazing developers</Paragraph>

        <Auth0 />

        <Paragraph>Or</Paragraph>

        <Title>Create a new account</Title>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor='username'>Username *</Label>
            <Input
              ref={userRef}
              autoComplete='off'
              required
              name='username'
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            {!validUser && user && <Error>Username not valid</Error>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor='email'>Email *</Label>
            <Input required name='email' value={email} onChange={e => setEmail(e.target.value)} />
            {!validEmail && email && <Error>Email not valid</Error>}
          </InputContainer>
          <InputContainer>
            <Label htmlFor='password'>Password *</Label>
            <Input
              type='password'
              name='password'
              required
              value={pwd}
              onChange={e => setPwd(e.target.value)}
            />
            {!validPwd && pwd && <Error>Password not valid</Error>}
          </InputContainer>

          <InputContainer>
            <input
              name='picture'
              type='file'
              ref={filePickerRef}
              style={{ display: 'none' }}
              onChange={e => setFile(e.target.files[0])}
            />
            <ImagePreview src={pictureURL.toString()} alt='Please pick an image' />
            <Button
              onClick={e => {
                e.preventDefault();
                filePickerRef.current.click();
              }}>
              Choose image
            </Button>
          </InputContainer>

          {isError && <Error>Either Username or email is taken</Error>}

          <Submit>Create Account</Submit>
        </form>
      </Wrapper>
    </RouteWrapper>
  );
};

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Error = tw.h4`text-red mb-4`;

const Submit = tw.button`bg-blue text-white py-2  w-full rounded-lg`;

const Heading = tw.h1`font-bold my-6`;

const Title = tw.h2`my-6`;

const Paragraph = tw.p`my-4`;

const InputContainer = tw.div`[&>*:first-child]:(block mb-2) flex flex-col gap-2 text-left mb-8`;

const Label = tw.label``;

const Input = tw.input`outline-none rounded-lg border border-solid border-light-gray w-full py-2 px-3 focus:border-blue`;

const Wrapper = tw.div`bg-white text-center max-w-2xl mx-auto py-12 px-10 rounded-md`;

export default SignUp;
