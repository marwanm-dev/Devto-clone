import tw from 'twin.macro';

const Placeholder = () => {
  return (
    <Wrapper>
      <Heading>No results match that query</Heading>
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full py-10 px-12 bg-white rounded-md border border-light-gray`;

const Heading = tw.h3`text-center font-light`;

export default Placeholder;
