import tw from 'twin.macro';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = tw.div`relative max-w-pg w-full flex justify-between mx-auto items-center mt-24 px-4`;

export default Layout;
