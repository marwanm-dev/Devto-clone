import tw from 'twin.macro';
import RouteWrapper from '../RouteWrapper';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Sorry, this page doesn't exist.</Heading>
        <Link to='/'>Go To Homepage</Link>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue p-4 w-full flex flex-col items-center justify-center gap-sm [&>a]:(text-white font-bold)`;

const Heading = tw.h1`text-white text-center`;

export default NotFound;
