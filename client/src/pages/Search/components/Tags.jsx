import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import FollowTag from '../../../common/FollowTag';
import Hashtag from '../../../common/Hashtag';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Placeholder from '../../../common/Placeholder';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { useGetTagsQuery } from '../../../core/features/tags/tagsApiSlice';
import { decreaseOpacity } from '../../../helpers/utils';

const Tags = ({ value }) => {
  const { data: tags, isLoading } = useGetTagsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const { id: userId } = useSelector(selectCurrentUser);
  const [filteredTags, setFilteredTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredTags(tags?.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase())));
  }, [value, tags]);

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredTags?.length > 0 ? (
        filteredTags.map(tag => (
          <Tag key={nanoid()} onClick={() => navigate(`/tags/${tag.name}`)}>
            <Flex>
              <HashtagWrapper bg={decreaseOpacity(tag.hashtagColor)} color={tag.hashtagColor}>
                <Hashtag large={true} />
              </HashtagWrapper>
              <Name>{tag.name}</Name>
            </Flex>
            <FlexBetween onClick={e => e.stopPropagation()}>
              <Posts> {tag.posts.length} posts published</Posts>
              <FollowTag
                tag={tag}
                isFollowed={tag.followers.includes(userId)}
                isTagPage={false}
                isLarge={true}
              />
            </FlexBetween>
          </Tag>
        ))
      ) : (
        <Placeholder />
      )}
    </Wrapper>
  );
};

const Tag = tw.div`rounded-md w-full overflow-hidden bg-white mb-2 shadow-sm hover:shadow p-6 cursor-pointer`;

const Flex = tw.div`flex gap-sm items-center`;

const FlexBetween = tw(Flex)`justify-between`;

const Name = tw.h2`hover:(text-blue underline)`;

const Posts = tw.p`text-gray ml-16`;

const HashtagWrapper = styled.span`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  ${tw`p-2 rounded-md`}
`;

const Wrapper = tw.div``;

export default Tags;
