import tw from 'twin.macro';

const Placeholder = ({ type }) => {
  return (
    <Wrapper>
      <Heading>Sorry, no {type} yet.</Heading>
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full`;

const Heading = tw.h3`text-center bg-light-blue text-blue py-1`;

export default Placeholder;
