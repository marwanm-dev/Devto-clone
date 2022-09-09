import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { selectSearchValue } from '../../core/features/search/searchSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import People from './components/People';
import Posts from './components/Posts';
import Tags from './components/Tags';

const Search = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useLocalStorage('selected-search', 'posts');
  const value = useSelector(selectSearchValue);

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Search results for {value}</Heading>
        <SearchWrapper>
          <Aside>
            <Type onClick={() => setSelected('posts')} selected={selected === 'posts'}>
              <Title>Posts</Title>
            </Type>
            <Type onClick={() => setSelected('people')} selected={selected === 'people'}>
              <Title>People</Title>
            </Type>
            <Type onClick={() => setSelected('tags')} selected={selected === 'tags'}>
              <Title>Tags</Title>
            </Type>
          </Aside>
          <Main>
            {selected === 'posts' ? (
              <Posts value={value} />
            ) : selected === 'people' ? (
              <People value={value} />
            ) : (
              <Tags value={value} />
            )}
          </Main>
        </SearchWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1`mb-lg`;

const SearchWrapper = tw.div`flex gap-md mob:(flex-col)`;

const Aside = tw.aside`w-1/3 mob:w-full`;

const Type = styled.div`
  ${tw`cursor-pointer rounded-md text-dark-gray p-3 flex justify-between items-center`};
  ${({ selected }) =>
    selected
      ? tw`bg-white font-bold`
      : tw`bg-transparent hover:(bg-light-blue [p:first-child]:text-blue)`}
`;

const Title = tw.p``;

const Main = tw.div`w-full`;

const Wrapper = tw.div``;

export default Search;
