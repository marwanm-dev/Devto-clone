import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const EditProfile = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>EditProfile page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default EditProfile;
