import tw, { styled } from 'twin.macro';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../core/features/auth/authSlice';
const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
};

export default RequireAuth;
