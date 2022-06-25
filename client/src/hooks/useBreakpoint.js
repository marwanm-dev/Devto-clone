import { useEffect, useState } from 'react';

const useBreakpoint = breakpoint => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  const handleResize = () => setIsBreakpoint(window.innerWidth <= breakpoint);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  return isBreakpoint;
};

export default useBreakpoint;
