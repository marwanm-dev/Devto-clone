import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetPlaceholder, resetValue, setPlaceholder } from '../core/features/search/searchSlice';

const usePlaceholder = type => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaceholder(`Search ${type}..`));
    dispatch(resetValue());

    return () => dispatch(resetPlaceholder());
  }, []);
};

export default usePlaceholder;
