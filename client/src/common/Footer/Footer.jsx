import { Link as RouterLink } from 'react-router-dom';
import tw from 'twin.macro';
import Social from '../Social';

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        This website is a clone of{' '}
        <Link to='//dev.to' target='_blank'>
          DEV.to
        </Link>{' '}
        (A constructive and inclusive social network for software developers) Made with love and{' '}
        <Link to='//reactjs.org' target='_blank'>
          react.
        </Link>
      </Content>
      <Social footer='true' />
    </Wrapper>
  );
};

const Wrapper = tw.div`bg-lightest-gray mt-xl w-full text-center py-md absolute bottom--80 left-0`;

const Link = tw(RouterLink)`text-blue`;

const Content = tw.p`max-w-2xl mx-auto`;

export default Footer;
