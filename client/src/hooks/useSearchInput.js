import { useDispatch, useSelector } from 'react-redux';
import { selectSearchValue, setSearchValue } from '../core/features/search/searchSlice';

const useSearchInput = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectSearchValue);

  const searchAttrs = {
    value,
    placeholder: 'Search..',
    onChange: e => e.target.value !== ' ' && dispatch(setSearchValue(e.target.value)),
  };

  return { searchAttrs, value };
};

export default useSearchInput;
