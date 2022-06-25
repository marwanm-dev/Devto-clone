import { useState, useEffect } from 'react';

const useAxios = configObj => {
  const { axiosInstance, method } = configObj;

  const [response, setResponse] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [url, setUrl] = useState('');

  const refetch = url => {
    setUrl(`/${url}`);
    setReload(prev => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          signal: controller.signal,
        });
        setResponse(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // useEffect cleanup function
    return () => controller.abort();
  }, [reload]);

  return { response, error, isLoading, refetch };
};

export default useAxios;
