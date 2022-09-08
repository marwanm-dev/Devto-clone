import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

const Social = ({ isFooter }) => {
  return (
    <Wrapper isFooter={isFooter}>
      <SocialWrapper isFooter={isFooter}>
        <SocialLink to={{ pathname: '//github.com/marodevv' }} target='_blank'>
          <AiFillGithub />
        </SocialLink>
      </SocialWrapper>
      <SocialWrapper isFooter={isFooter}>
        <SocialLink to={{ pathname: '//www.instagram.com/marwan_mostafa24' }} target='_blank'>
          <AiFillInstagram />
        </SocialLink>
      </SocialWrapper>
      <SocialWrapper isFooter={isFooter}>
        <SocialLink
          to={{ pathname: '//www.linkedin.com/in/marwan-mostafa-4ba111210' }}
          target='_blank'>
          <AiFillLinkedin />
        </SocialLink>
      </SocialWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`py-3 flex [svg]:w-full [a]:w-full [&>*:first-child]:(rounded-tl-lg rounded-bl-lg) [&>*:last-child]:(rounded-tr-lg rounded-br-lg)`}
  ${({ isFooter }) => isFooter && tw`max-w-2xl mx-auto`}
`;

const SocialWrapper = styled.div`
  ${tw`w-full cursor-pointer flex justify-start text-center gap-2 text-black p-3`}
  ${({ isFooter }) =>
    isFooter ? tw`hover:(text-white bg-blue)` : tw`rounded-md hover:(text-blue bg-light-blue)`}
`;

const SocialLink = tw(Link)`cursor-pointer w-full text-xl`;

export default Social;
