import { useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery, useLazyRefreshQuery } from '../core/features/auth/authApiSlice';

const useRefreshToken = () => {
  const navigate = useNavigate();
  const [logoutTrigger = trigger] = useLazyLogoutQuery();
  const [refreshTrigger = trigger] = useLazyRefreshQuery();

  const handleLogout = () => {
    try {
      logoutTrigger();

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = async () => {
    const result = await refreshTrigger();
    const data = await result.data;
    const error = await result.isError;
    if (!data || error) handleLogout();
  };

  return handleRefresh;
};

export default useRefreshToken;
