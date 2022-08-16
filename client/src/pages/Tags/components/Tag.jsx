import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import FollowTag from '../../../common/FollowTag';
import { decreaseOpacity } from '../../../helpers/utils';
const Tag = ({ tag }) => {
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
      <FollowTag tag={tag} isFollowed={tag.isFollowed} />
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

const Wrapper = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md [&>*:not(:first-child )]:mt-sm`}
`;

export default Tag;
