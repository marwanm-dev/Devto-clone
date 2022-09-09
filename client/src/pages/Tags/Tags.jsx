import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetTagsQuery } from '../../core/features/tags/tagsApiSlice';
import Tag from './components/Tag';

const Tags = () => {
  const { data: tags } = useGetTagsQuery(null, { refetchOnMountOrArgChange: true });
  const { id: userId } = useSelector(selectCurrentUser);
  const modifiedTags = tags?.map(tag => {
    return { ...tag, isFollowed: tag.followers.includes(userId) };
  });

  return (
    <RouteWrapper>
      <Wrapper>
        {modifiedTags &&
          modifiedTags.map(tag => (
            <Tag key={nanoid()} tag={tag} isFollowed={tag.isFollowed} isTagPage={false} />
          ))}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 16px;
  @media (min-width: calc(calc(3 * 16px) + calc(3 * 275px))) {
    grid-template-columns: repeat(3, minmax(275px, 1fr));
  }
`;

export default Tags;
