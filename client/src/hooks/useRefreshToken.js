import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { setCredentials } from '../core/features/auth/authSlice';
import { useLogoutQuery } from '../core/features/auth/authApiSlice';
import { logout } from '../core/features/auth/authSlice';

const REFRESH_URL = '/refresh';

const useRefreshToken = () => {
  const { refetch } = useLogoutQuery();
  const dispatch = useDispatch();

  const handleLogout = () => {
    refetch();
    logout();
  };

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, { withCredentials: true });

    // set new access token
    console.log(`responseData: ${response.data}`);

    // dispatch(setCredentials({}));

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
