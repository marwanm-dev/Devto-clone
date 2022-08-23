import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken, setAuthModal } from '../core/features/auth/authSlice';

const useRequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const isAuthed = !!token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = () => !isAuthed && dispatch(setAuthModal(true));

  return { isAuthed, handleAuth };
};

export default useRequireAuth;
