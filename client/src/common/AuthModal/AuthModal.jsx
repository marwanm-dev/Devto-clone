import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { FaDev } from 'react-icons/fa';
import { setAuthModal, selectAuthModal } from '../../core/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { preventScroll } from '../../helpers/body';
import Backdrop from '../../common/Backdrop';

const AuthModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authModal = useSelector(selectAuthModal);
  preventScroll(authModal);

  return (
    <>
      <Backdrop onClick={() => dispatch(setAuthModal(false))} />
      <Wrapper>
        <Header>
          <Heading>Login to continue</Heading>
          <CloseIcon>
            <IoCloseOutline onClick={() => dispatch(setAuthModal(false))} />
          </CloseIcon>
        </Header>
        <Main>
          <DevIcon>
            <FaDev />
          </DevIcon>
          <Paragraph>
            We're a place where coders share, stay up-to-date and grow their careers.
          </Paragraph>
        </Main>
        <Footer>
          <SignUp
            onClick={() => {
              navigate('/auth/new');
              dispatch(setAuthModal(false));
            }}>
            Create new account
          </SignUp>
          <Login
            onClick={() => {
              navigate('/auth/login');
              dispatch(setAuthModal(false));
            }}>
            Log in
          </Login>
        </Footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  transform: translate(-50%, -50%);
  ${tw`max-w-[850px] w-full fixed left-1/2 top-1/2 max-h-full p-4 bg-white z-50 rounded-md`}
`;

const Header = tw.div`flex items-center justify-between pb-2 border-b border-black`;
const Heading = tw.h3``;
const CloseIcon = tw.div`text-xl cursor-pointer`;

const Main = tw.div`text-center`;
const DevIcon = styled.div.attrs({
  to: '/',
})`
  rotate: -15deg;
  ${tw`cursor-pointer text-6xl w-max text-center mx-auto mt-md`}
`;
const Paragraph = tw.p`mt-sm mb-md`;

const Footer = tw.div``;
const SignUp = tw.button`w-full rounded-md border border-solid border-white py-2 px-3 text-blue bg-white border-blue hover:(text-white bg-blue border-blue) mb-2`;
const Login = tw.button`w-full rounded-md text-black py-2 px-3 hover:(text-blue bg-light-blue)`;

export default AuthModal;
