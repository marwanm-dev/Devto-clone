import tw, { theme } from 'twin.macro';
import PostsList from '../../common/PostsList';
import Resources from '../../common/Resources';
import RouteWrapper from '../../common/RouteWrapper';
import useBreakpoint from '../../hooks/useBreakpoint';
import Tags from './components/Tags';

const Home = ({ saved }) => {
  const isMobile = useBreakpoint(theme`screens.mob.max`.replace('px', ''));
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  return (
    <RouteWrapper>
      <Wrapper>
        {!isMobile && <Resources saved={saved} />}
        <PostsList saved={saved} />
        {!isLaptop && <Tags />}
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1``;

const Wrapper = tw.div`flex gap-4 justify-center`;

export default Home;
