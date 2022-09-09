import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import FollowTag from '../../../common/FollowTag';
import Hashtag from '../../../common/Hashtag';
import { decreaseOpacity } from '../../../helpers/utils';

const Tag = ({ tag, isTagPage }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Bg color={tag.hashtagColor} />
      <Title
        bg={decreaseOpacity(tag.hashtagColor)}
        color={tag.hashtagColor}
        onClick={() => navigate(`/tags/${tag.name}`)}>
        <HashtagWrapper color={tag.hashtagColor}>
          <Hashtag />
        </HashtagWrapper>
        {tag.name}
      </Title>
      <Posts>{tag.posts.length} posts published</Posts>
      <FollowTag tag={tag} isFollowed={tag.isFollowed} isTagPage={isTagPage} />
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

const HashtagWrapper = styled.span`
  color: ${({ color }) => color};
`;

const Posts = tw.p`text-dark-gray ml-2`;

const Wrapper = styled.div`
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md shadow-sm [&>*:not(:first-child )]:mt-sm`}
`;

export default Tag;
