import { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import LoginGithub from 'react-login-github';
import tw from 'twin.macro';

const Github = ({ onLogin }) => {
  const [showLoginButton, setShowLoginButton] = useState(true);

  const onSuccess = async res => {
    onLogin(res);
    setShowLoginButton(false);
  };

  const onFailure = async res => {
    console.log(res);
  };

  return (
    showLoginButton && (
      <LoginGithub
        clientId={'1126cea81f0703d86f79'}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <BsGithub /> Continue with github
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    )
  );
};

const Button = tw.div`flex gap-2 justify-center items-center w-full bg-light-gray py-4 cursor-pointer rounded-md`;

export default Github;
