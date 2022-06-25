import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { useLogoutQuery } from '../../core/features/auth/authApiSlice';
import { logout } from '../../core/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const { refetch } = useLogoutQuery();

  const handleLogout = () => {
    refetch();
    logout();

    navigate('/');
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Are you sure you want to sign out?</Heading>
        <LogoutButton onClick={handleLogout}>Yes, Sign out</LogoutButton>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1``;

const LogoutButton = tw.button`text-white bg-blue rounded-md py-4 px-6 mt-6`;

const Wrapper = tw.div`text-center`;

export default Logout;
