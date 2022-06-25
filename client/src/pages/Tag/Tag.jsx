import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Tag = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Tag page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Tag;
