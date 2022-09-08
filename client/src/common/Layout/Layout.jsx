import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { selectAuthModal } from '../../core/features/auth/authSlice';
import AuthModal from '../AuthModal';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = () => {
  const authModal = useSelector(selectAuthModal);

  return (
    <>
      <Wrapper>
        <Navbar />
        {authModal && <AuthModal />}
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = tw.div`max-w-pg w-full flex justify-between mx-auto items-center mt-24 px-4`;

export default Layout;
