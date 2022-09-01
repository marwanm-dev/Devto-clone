import tw from 'twin.macro';

const Error = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = tw.p`font-bold text-red mx-auto w-max`;

export default Error;
