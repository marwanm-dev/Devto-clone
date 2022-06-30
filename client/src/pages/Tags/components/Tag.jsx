import tw, { styled } from 'twin.macro';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tag = ({ tag }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Bg />
      <Title onClick={() => navigate(`/tags/${tag}`)}>#{tag}</Title>
      <Button isFollowed={isFollowed} onClick={() => setIsFollowed(!isFollowed)}>
        {isFollowed ? 'Following' : 'Follow'}
      </Button>
    </Wrapper>
  );
};

const Bg = tw.div`bg-black w-full h-4 absolute top-0 left-0`;

const Title = tw.h2`cursor-pointer`;

const Button = styled.button`
  ${tw`border-2 border-solid border-transparent max-w-lg rounded-md bg-light-gray hover:bg-gray px-2 py-1 text-sm font-semibold`}
  ${({ isFollowed }) => isFollowed && tw`border-gray bg-white hover:bg-white`}
`;

const Wrapper = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md [&>*:not(:first-child )]:mt-sm`}
`;

export default Tag;
