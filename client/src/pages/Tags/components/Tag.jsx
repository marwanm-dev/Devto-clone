import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { decreaseOpacity } from '../../../helpers/utils';

const Tag = ({ tag }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Bg color={tag.hashtagColor} />
      <Title
        bg={decreaseOpacity(tag.hashtagColor)}
        color={tag.hashtagColor}
        onClick={() => navigate(`/tags/${tag.name}`)}>
        <Hashtag color={tag.hashtagColor}>#</Hashtag>
        {tag.name}
      </Title>
      <Posts>{tag.posts.length} posts published</Posts>
      <Button isFollowed={isFollowed} onClick={() => setIsFollowed(!isFollowed)}>
        {isFollowed ? 'Following' : 'Follow'}
      </Button>
    </Wrapper>
  );
};

const Bg = styled.div`
  background: ${({ color }) => color};
  ${tw`w-full h-4 absolute top-0 left-0`};
`;

const Title = styled.h2`
  border: 1px solid transparent;
  &:hover {
    background: ${({ bg }) => bg};
    border-color: ${({ color }) => color};
  }

  ${tw`cursor-pointer px-2 py-1 rounded-md w-max`}
`;

const Hashtag = styled.span`
  color: ${({ color }) => color};
`;

const Posts = tw.p`text-dark-gray ml-2`;

const Button = styled.button`
  ${tw`border-2 border-solid border-transparent max-w-lg rounded-md bg-light-gray hover:bg-gray px-2 py-1 text-sm font-semibold ml-2`}
  ${({ isFollowed }) => isFollowed && tw`border-gray bg-white hover:bg-white`}
`;

const Wrapper = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md [&>*:not(:first-child )]:mt-sm`}
`;

export default Tag;
