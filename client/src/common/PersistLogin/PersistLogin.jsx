import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRefreshToken from '../../hooks/use-refresh-token';
import useLocalStorage from '../../hooks/useLocalStorage';
import { selectCurrentToken } from '../../core/features/auth/authSlice';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [persist] = useLocalStorage('persist', false);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
