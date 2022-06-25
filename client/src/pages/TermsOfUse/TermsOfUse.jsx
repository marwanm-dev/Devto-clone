import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Tags = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Tags page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Tags;
