import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const NotFound = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>NotFound page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default NotFound;
