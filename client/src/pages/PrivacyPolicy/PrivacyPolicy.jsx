import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const PrivacyPolicy = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>PrivacyPolicy page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default PrivacyPolicy;
