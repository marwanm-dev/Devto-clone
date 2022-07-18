import tw, { theme } from 'twin.macro';
import { MoonLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <MoonLoader color={theme`colors.blue`} speedMultiplier={0.6} />
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full h-screen flex justify-center items-center`;

export default LoadingSpinner;
