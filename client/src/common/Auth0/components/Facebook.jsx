import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { BsFacebook } from 'react-icons/bs';

const Facebook = ({ onLogin }) => {
  const responseFacebook = async response => {
    onLogin(response);
  };

  return (
    <FacebookLogin
      appId={null}
      autoLoad={false}
      callback={responseFacebook}
      render={renderProps => (
        <>
          <AiFillFacebook />
          <p>Continue with Facebook</p>
        </>
      )}
    />
  );
};

export default Facebook;
