import { nanoid } from '@reduxjs/toolkit';
import tw, { styled } from 'twin.macro';
import { decreaseOpacity } from '../../../helpers/utils';

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
            <Hashtag color={tag.hashtagColor}>#</Hashtag>
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

const Hashtag = styled.span`
  color: ${({ color }) => color};
`;

const Posts = tw.p`text-dark-gray ml-2`;

const Tag = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`flex-[1 0 30%] min-w-[250px] max-w-[300px] bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md [&>*:not(:first-child )]:mt-sm`}
`;

const Wrapper = tw.div`flex gap-2 flex-wrap`;

export default FollowedTags;
