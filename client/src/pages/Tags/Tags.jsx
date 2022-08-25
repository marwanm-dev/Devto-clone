import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { selectSearchValue } from '../../core/features/search/searchSlice';
import { useGetTagsQuery } from '../../core/features/tags/tagsApiSlice';
import usePlaceholder from '../../hooks/usePlaceholder';
import Tag from './components/Tag';

const Tags = () => {
  const searchValue = useSelector(selectSearchValue);
  const { data: tags } = useGetTagsQuery(null, { refetchOnMountOrArgChange: true });
  const { id: userId } = useSelector(selectCurrentUser);
  const modifiedTags = tags?.map(tag => {
    return { ...tag, isFollowed: tag.followers.includes(userId) };
  });
  usePlaceholder('tags by name');

  return (
    <RouteWrapper>
      <Wrapper>
        {modifiedTags &&
          modifiedTags.map(
            tag =>
              tag.name.toLowerCase().includes(searchValue.toLowerCase()) && (
                <Tag key={nanoid()} tag={tag} isFollowed={tag.isFollowed} />
              )
          )}
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
