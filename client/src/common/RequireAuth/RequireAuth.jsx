import { Navigate, Outlet } from 'react-router-dom';
import useRequireAuth from '../../hooks/useRequireAuth';

const RequireAuth = () => {
  const { isAuthed, handleAuth } = useRequireAuth();

  if (!isAuthed) handleAuth();

  return isAuthed ? <Outlet /> : <Navigate to='/' replace={true} />;
};

export default RequireAuth;
