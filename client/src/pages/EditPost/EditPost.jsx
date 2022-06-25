import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const EditPost = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>EditPost page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default EditPost;
