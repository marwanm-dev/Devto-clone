import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../../common/PostsList';
const Tag = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { tagname } = useParams();

  return (
    <RouteWrapper>
      <CurrentTag>
        <Bg />
        <Title>#{tagname}</Title>
        <Button isFollowed={isFollowed} onClick={() => setIsFollowed(!isFollowed)}>
          {isFollowed ? 'Following' : 'Follow'}
        </Button>
      </CurrentTag>
      <Wrapper>
        <PostsList />
      </Wrapper>
    </RouteWrapper>
  );
};

const Bg = tw.div`bg-black w-full h-4 absolute top-0 left-0`;

const Title = tw.h2`cursor-pointer`;

const Button = styled.button`
  ${tw`border-2 border-solid border-transparent max-w-lg rounded-md text-white bg-blue px-2 py-1 text-sm font-semibold`}
  ${({ isFollowed }) => isFollowed && tw`border-blue bg-white text-blue`}
`;

const CurrentTag = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md flex items-center justify-between [&>*:not(:first-child )]:mt-sm mb-lg`}
`;

const Wrapper = tw.div`w-3/5 mx-auto`;

export default Tag;
