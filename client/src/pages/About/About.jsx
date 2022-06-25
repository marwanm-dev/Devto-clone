import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const About = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>About page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default About;
