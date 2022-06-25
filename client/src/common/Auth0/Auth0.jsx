import tw from 'twin.macro';
import { BsGoogle, BsGithub, BsLinkedin, BsFacebook } from 'react-icons/bs';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0 = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <Button onClick={loginWithRedirect}>
        <BsGoogle />
        Continue with Google
      </Button>
      <Button onClick={loginWithRedirect}>
        <BsGithub />
        Continue with Github
      </Button>
      <Button onClick={loginWithRedirect}>
        <BsFacebook />
        Continue with Facebook
      </Button>
      <Button onClick={loginWithRedirect}>
        <BsLinkedin />
        Continue with LinkedIn
      </Button>
    </Wrapper>
  );
};

const Wrapper = tw.div`[&>*:not(:last-child)]:mb-sm`;

const Button = tw.button`rounded-md flex items-center justify-center gap-sm w-full py-4 px-6 [&:nth-of-type(1)]:(bg-lighter-gray text-black [&>*]:text-black) text-white [&:nth-of-type(2)]:bg-black [&:nth-of-type(3)]:bg-[#4065B5] [&:nth-of-type(4)]:bg-[#0e76a8] [&>*]:(text-lg text-white)`;

export default Auth0;
