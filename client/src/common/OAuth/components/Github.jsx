import { useState } from 'react';
import GithubButton from 'react-github-login-button';
import LoginGithub from 'react-login-github';

const Github = ({ onLogin, classes }) => {
  const [isClicked, setIsClicked] = useState(false);

  const onSuccess = async res => {
    onLogin(res);
    setIsClicked(true);
  };

  const onFailure = async res => {
    console.log(res);
  };

  return (
    <LoginGithub
      clientId={process.env.GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}>
      <GithubButton onClick={null} disabled={isClicked} label='Continue with Github' />
    </LoginGithub>
  );
};

export default Github;
