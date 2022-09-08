import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import Error from '../../common/Error';
import LoadingSpinner from '../../common/LoadingSpinner';
import OAuth from '../../common/OAuth';
import RouteWrapper from '../../common/RouteWrapper';
import { useSignUpMutation } from '../../core/features/auth/authApiSlice';
import useBase64 from '../../hooks/useBase64';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');
  const filePickerRef = useRef();

  const [validName, setValidName] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [inputsAreValid, setInputsAreValid] = useState(false);

  const NAME_REGEX = /^[A-z][a-z ]{3,23}$/;
  const USER_REGEX = /^[a-z][a-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const nameRef = useRef(null);

  const [signUp, { isLoading, isError }] = useSignUpMutation();

  useEffect(() => nameRef.current.focus(), []);

  useEffect(() => setValidName(NAME_REGEX.test(name)), [name]);

  useEffect(() => setValidUser(USER_REGEX.test(user)), [user]);

  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);

  useEffect(() => setValidPwd(PWD_REGEX.test(pwd)), [pwd]);

  const picture = useBase64(file);

  useEffect(
    () => setInputsAreValid(validName && validUser && validEmail && validPwd),
    [validName, validUser, validEmail, validPwd]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (inputsAreValid && !isError) {
      try {
        await signUp({
          name,
          user,
          email,
          pwd,
          picture,
        }).unwrap();

        setName('');
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Wrapper>
          <Heading>Welcome to DEV Community</Heading>
          <Paragraph>DEV Community is a community of 748,239 amazing developers</Paragraph>

          <OAuth />

          <Paragraph>Or</Paragraph>

          <Title>Create a new account</Title>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Label htmlFor='name'>Name *</Label>
              <Input
                ref={nameRef}
                autoComplete='off'
                required
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {!validName && name && <Error>Name not valid</Error>}
            </InputContainer>

            <InputContainer>
              <Label htmlFor='username'>Username *</Label>
              <Input
                autoComplete='off'
                required
                id='username'
                value={user}
                onChange={e => setUser(e.target.value)}
              />
              {!validUser && user && <Error>Username not valid</Error>}
            </InputContainer>

            <InputContainer>
              <Label htmlFor='email'>Email *</Label>
              <Input required id='email' value={email} onChange={e => setEmail(e.target.value)} />
              {!validEmail && email && <Error>Email not valid</Error>}
            </InputContainer>
            <InputContainer>
              <Label htmlFor='password'>Password *</Label>
              <Input
                type='password'
                id='password'
                required
                value={pwd}
                onChange={e => setPwd(e.target.value)}
              />
              {!validPwd && pwd && <Error>Password not valid</Error>}
            </InputContainer>

            <InputContainer>
              <input
                id='picture'
                type='file'
                ref={filePickerRef}
                style={{ display: 'none' }}
                onChange={e => setFile(e.target.files[0])}
              />
              <ImagePreview src={picture.toString()} alt='Please pick an image' />
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
      )}
    </RouteWrapper>
  );
};

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Submit = tw.button`bg-blue text-white py-2  w-full rounded-lg`;

const Heading = tw.h1`font-bold my-6`;

const Title = tw.h2`my-6`;

const Paragraph = tw.p`my-4`;

const InputContainer = tw.div`[&>*:first-child]:(block mb-2) flex flex-col gap-2 text-left mb-8`;

const Label = tw.label``;

const Input = tw.input`outline-none rounded-lg border border-solid border-light-gray w-full py-2 px-3 focus:border-blue`;

const Wrapper = tw.div`bg-white text-center max-w-2xl mx-auto py-12 px-10 rounded-md`;

export default SignUp;
