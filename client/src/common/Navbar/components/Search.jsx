import tw, { styled } from 'twin.macro';
import useInput from '../../../hooks/useInput';

const Search = () => {
  const { searchAttrs } = useInput('search', '');

  return <Input {...searchAttrs} />;
};

const Input = styled.input.attrs({
  placeholder: 'Search...',
})`
  ${tw`border border-solid text-black border-gray max-w-search w-full p-2 rounded-md outline-none focus:(border-blue)`}
`;

export default Search;
