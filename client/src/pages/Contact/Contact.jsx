import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Contact = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Contact page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Contact;
