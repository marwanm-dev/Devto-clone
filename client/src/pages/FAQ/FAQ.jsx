import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const FAQ = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>FAQ page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default FAQ;
