import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken';
import { selectCurrentToken } from '../core/features/auth/authSlice';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      err => Promise.reject(err)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async err => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
