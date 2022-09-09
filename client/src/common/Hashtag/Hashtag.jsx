import { HiOutlineHashtag } from 'react-icons/hi';
import tw, { styled } from 'twin.macro';

const Hashtag = ({ large = false }) => {
  return (
    <Wrapper large={large}>
      <HiOutlineHashtag />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ large }) => large && tw`text-2xl`}
  ${tw`[svg]:inline inline`}
`;

export default Hashtag;
