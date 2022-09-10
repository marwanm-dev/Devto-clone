import tw, { styled } from 'twin.macro';

const LoadingController = ({ children, isLoading }) => (
  <Controller isLoading={isLoading}>{children}</Controller>
);

const Controller = styled.div`
  ${({ isLoading }) => isLoading && tw`pointer-events-none opacity-60`}
`;

export default LoadingController;
