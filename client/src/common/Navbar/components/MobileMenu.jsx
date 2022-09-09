import { IoIosClose } from 'react-icons/io';
import tw, { styled } from 'twin.macro';
import Backdrop from '../../Backdrop';
import Resources from '../../Resources';

const MobileMenu = ({ toggleMobileMenu }) => {
  return (
    <>
      <Backdrop onClick={toggleMobileMenu} />
      <Wrapper>
        <Menu>
          <Heading>DEV Community</Heading>
          <CloseIcon onClick={toggleMobileMenu}>
            <IoIosClose />
          </CloseIcon>
        </Menu>
        <Resources />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.aside`
  ${tw`w-72 bg-white h-screen z-50 absolute overflow-y-scroll inset-0 px-sm shadow-md`}
  > div {
    ${tw`w-full`};
  }
`;

const Heading = tw.h2``;

const Menu = tw.div`flex justify-between items-center py-4`;

const CloseIcon = styled.div`
  ${tw`rounded-md text-black hover:(text-blue bg-light-blue) cursor-pointer`}
  svg {
    font-size: 2.25rem;
  }
`;

export default MobileMenu;
