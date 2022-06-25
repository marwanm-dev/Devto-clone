import tw from 'twin.macro';

const Input = () => {
  return (
    <Wrapper>
      <input />
    </Wrapper>
  );
};

const Wrapper = tw.div`relative max-w-pg w-full flex justify-between mx-auto items-center mt-24 px-4`;

export default Input;
