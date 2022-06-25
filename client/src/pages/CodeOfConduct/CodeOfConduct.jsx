import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const CodeOfConduct = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>CodeOfConduct page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default CodeOfConduct;
