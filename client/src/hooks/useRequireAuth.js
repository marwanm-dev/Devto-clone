import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, setAuthModal } from '../core/features/auth/authSlice';

const useRequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const isAuthed = !!token;
  const dispatch = useDispatch();

  const handleAuth = () => !isAuthed && dispatch(setAuthModal(true));

  return { isAuthed, handleAuth };
};

export default useRequireAuth;
