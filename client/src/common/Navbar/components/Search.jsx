import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import useSearchInput from '../../../hooks/useSearchInput';

const Search = () => {
  const { searchAttrs, value } = useSearchInput();
  const navigate = useNavigate();

  return (
    <Form onKeyDown={e => value && e.key === 'Enter' && navigate('/search')}>
      <Input {...searchAttrs} />
      <SearchIcon>
        <FiSearch onClick={() => value && navigate('/search')} />
      </SearchIcon>
    </Form>
  );
};

const Form = tw.div`relative max-w-search w-full`;

const Input = tw.input`text-black w-full outline-none pl-2 pr-12 py-2 border-2 rounded-md border-solid border-light-gray focus:(border-blue)`;

const SearchIcon = tw.div`absolute top-1 bottom-1 right-1 w-10 text-2xl hover:(bg-light-blue text-blue) flex items-center justify-center rounded-md cursor-pointer`;

export default Search;
