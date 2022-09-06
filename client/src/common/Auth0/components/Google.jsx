import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { BsGoogle } from 'react-icons/bs';
import tw from 'twin.macro';

const Google = ({ onLogin }) => {
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: '696107882857-aohdavkpvfllchnd8folvqom8lar11rc.apps.googleusercontent.com',
        scope: 'email',
      });
    });
  }, []);

  const onSuccess = async res => {
    onLogin(res);
    setShowLoginButton(false);
  };

  const onFailure = async res => {
    console.log(res);
  };

  return (
    showLoginButton && (
      <GoogleLogin
        clientId={'696107882857-aohdavkpvfllchnd8folvqom8lar11rc.apps.googleusercontent.com'}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <BsGoogle /> Continue with Google
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    )
  );
};

const Button = tw.div`flex gap-2 justify-center items-center w-full bg-light-gray py-4 cursor-pointer rounded-md`;

export default Google;
