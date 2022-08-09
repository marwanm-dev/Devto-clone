import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import PostsList from '../../common/PostsList';
import RouteWrapper from '../../common/RouteWrapper';
import { useGetTagByNameQuery } from '../../core/features/tags/tagsApiSlice';

const Tag = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { name } = useParams();
  const { data: tag, isLoading } = useGetTagByNameQuery(name, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <RouteWrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && tag && (
        <>
          <CurrentTag>
            <Bg color={tag.hashtagColor} />
            <Title>
              <Hashtag color={tag.hashtagColor}>#</Hashtag>
              {tag.name}
            </Title>
            <Button isFollowed={isFollowed} onClick={() => setIsFollowed(!isFollowed)}>
              {isFollowed ? 'Following' : 'Follow'}
            </Button>
          </CurrentTag>
          <Wrapper>
            <PostsList tagname={name} />
          </Wrapper>
        </>
      )}
    </RouteWrapper>
  );
};

const Bg = styled.div`
  ${tw`bg-black w-full h-4 absolute top-0 left-0`}
  background: ${({ color }) => color}; ;
`;

const Title = tw.h2`px-2 py-1 rounded-md w-max`;

const Hashtag = styled.span`
  color: ${({ color }) => color};
`;

const Button = styled.button`
  ${tw`border-2 border-solid border-transparent max-w-lg rounded-md text-white bg-blue px-2 py-1 text-sm font-semibold`}
  ${({ isFollowed }) => isFollowed && tw`border-blue bg-white text-blue`}
`;

const CurrentTag = styled.div`
  box-shadow: 0 0px 8px -4px rgba(0, 0, 0, 0.2);
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md flex items-center justify-between [&>*:not(:first-child )]:mt-sm mb-lg`}
`;

const Wrapper = tw.div`w-3/5 lap:w-4/5 mx-auto`;

export default Tag;
