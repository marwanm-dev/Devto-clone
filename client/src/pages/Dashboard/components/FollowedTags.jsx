import { nanoid } from '@reduxjs/toolkit';
import tw, { styled } from 'twin.macro';
import { decreaseOpacity } from '../../../helpers/utils';
import Hashtag from '../../../common/Hashtag';

const FollowedTags = ({ followedTags, navigate }) => {
  return (
    <Wrapper>
      {followedTags.map(tag => (
        <Tag key={nanoid()}>
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
        </Tag>
      ))}
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

const Tag = styled.div`
  ${tw`flex-[1 0 30%] min-w-[250px] max-w-[300px] bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md [&>*:not(:first-child )]:mt-sm shadow-sm`}
`;

const Wrapper = tw.div`flex gap-2 flex-wrap`;

export default FollowedTags;
