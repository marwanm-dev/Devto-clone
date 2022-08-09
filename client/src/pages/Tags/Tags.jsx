import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { selectSearchValue } from '../../core/features/search/searchSlice';
import { useGetTagsQuery } from '../../core/features/tags/tagsApiSlice';
import usePlaceholder from '../../hooks/usePlaceholder';
import Tag from './components/Tag';

const Tags = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const { data: tags } = useGetTagsQuery([], { refetchOnMountOrArgChange: true });
  usePlaceholder('tags by name');

  return (
    <RouteWrapper>
      <Wrapper>
        {tags &&
          tags.map(tag => tag.name.includes(searchValue) && <Tag key={nanoid()} tag={tag} />)}
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
