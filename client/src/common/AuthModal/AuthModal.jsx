import { FaDev } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Backdrop from '../../common/Backdrop';
import { selectAuthModal, setAuthModal } from '../../core/features/auth/authSlice';
import { preventScroll } from '../../helpers/body';

const AuthModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authModal = useSelector(selectAuthModal);
  preventScroll(authModal);

  const onClick = (navigation = '') => {
    dispatch(setAuthModal(false));

    if (navigation) navigate(navigation);
  };

  return (
    <>
      <Backdrop onClick={onClick} />
      <Wrapper>
        <Header>
          <Heading>Unauthorized</Heading>
          <CloseIcon>
            <IoCloseOutline onClick={onClick} />
          </CloseIcon>
        </Header>
        <Main>
          <DevIcon onClick={() => onClick('/')}>
            <FaDev />
          </DevIcon>
          <Paragraph>
            We're a place where coders share, stay up-to-date and grow their careers.
          </Paragraph>
        </Main>
        <Footer>
          <SignUp onClick={() => onClick('/auth/new')}>Create new account</SignUp>
          <Login onClick={() => onClick('/auth/login')}>Log in</Login>
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
