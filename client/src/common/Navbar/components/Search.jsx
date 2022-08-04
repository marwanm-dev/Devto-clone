import tw, { styled } from 'twin.macro';
import useSearchInput from '../../../hooks/useSearchInput';

const Search = () => {
  const { searchAttrs } = useSearchInput();

  return <Input {...searchAttrs} />;
};

const Input = styled.input`
  ${tw`border border-solid text-black border-gray max-w-search w-full p-2 rounded-md outline-none focus:(border-blue)`}
`;

export default Search;
