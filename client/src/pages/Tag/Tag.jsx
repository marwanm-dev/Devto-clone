import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import FollowTag from '../../common/FollowTag';
import LoadingSpinner from '../../common/LoadingSpinner';
import PostsList from '../../common/PostsList';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useGetTagByNameQuery,
  useHandleFollowMutation,
} from '../../core/features/tags/tagsApiSlice';
import Hashtag from '../../common/Hashtag';
const Tag = () => {
  const { name } = useParams();
  const { data: tag, isLoading } = useGetTagByNameQuery(name, {
    refetchOnMountOrArgChange: true,
  });
  const { id: userId } = useSelector(selectCurrentUser);

  return (
    <RouteWrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && tag && (
        <>
          <CurrentTag>
            <Bg color={tag.hashtagColor} />
            <Title>
              <HashtagWrapper color={tag.hashtagColor}>
                <Hashtag />
              </HashtagWrapper>
              {tag.name}
            </Title>
            <FollowTag tag={tag} isFollowed={tag.followers.includes(userId)} isTagPage={true} />
          </CurrentTag>
          <Wrapper>
            <PostsList
              posts={tag.posts}
              toInvalidate={{ type: 'Tag', id: tag.id, extra: { name: tag.name } }}
              filteredTag={name}
            />
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

const HashtagWrapper = styled.span`
  color: ${({ color }) => color};
`;

const CurrentTag = styled.div`
  ${tw`bg-lighter-gray py-6 px-4 relative overflow-hidden rounded-md flex items-center justify-between [&>*:not(:first-child )]:mt-sm mb-lg shadow-sm`}
`;

const Wrapper = tw.div`w-3/5 lap:w-4/5 mx-auto`;

export default Tag;
