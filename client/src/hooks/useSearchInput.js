import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlaceholder,
  selectSearchValue,
  setSearchValue,
} from '../core/features/search/searchSlice';

const useSearchInput = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectSearchValue);
  const placeholder = useSelector(selectPlaceholder);

  const searchAttrs = {
    value,
    placeholder,
    onChange: e => dispatch(setSearchValue(e.target.value)),
  };

  return { searchAttrs };
};

export default useSearchInput;
