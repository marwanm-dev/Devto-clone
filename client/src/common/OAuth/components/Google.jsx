import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { GoogleLogin } from 'react-google-login';

const Google = ({ onLogin }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    });
  }, []);

  const onSuccess = async res => {
    onLogin(res);
    setIsClicked(true);
  };

  const onFailure = async res => {
    console.log(res);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={renderProps => (
        <GoogleButton
          onClick={renderProps.onClick}
          label='Continue with Google'
          disabled={isClicked}
        />
      )}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Google;
