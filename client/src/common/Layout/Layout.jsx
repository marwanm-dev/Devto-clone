import tw, { styled } from 'twin.macro';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import AuthModal from '../AuthModal';
import { useSelector } from 'react-redux';
import { selectAuthModal } from '../../core/features/auth/authSlice';

const Layout = () => {
  const authModal = useSelector(selectAuthModal);

  return (
    <Wrapper>
      <Navbar />
      {authModal && <AuthModal />}
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = tw.div`max-w-pg w-full flex justify-between mx-auto items-center mt-24 px-4`;

export default Layout;
