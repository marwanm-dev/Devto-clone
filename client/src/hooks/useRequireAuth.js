import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken, setAuthModal } from '../core/features/auth/authSlice';

const useRequireAuth = (mustNavigate = false, onLoad = false) => {
  const token = useSelector(selectCurrentToken);
  const isAuthed = !!token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (!isAuthed) {
      if (mustNavigate) {
        navigate('/', { replace: true });
      }
      dispatch(setAuthModal(true));
    }
  };

  useEffect(() => {
    if (onLoad) handleAuth();
  }, []);

  return { isAuthed, handleAuth };
};

export default useRequireAuth;
