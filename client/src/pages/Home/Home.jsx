import tw, { theme } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import Resources from '../../common/Resources';
import PostsList from './components/PostsList';
import Tags from './components/Tags';
import useBreakpoint from '../../hooks/useBreakpoint';

const Home = () => {
  const isMobile = useBreakpoint(theme`screens.mob.max`.replace('px', ''));
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  return (
    <RouteWrapper>
      <Wrapper>
        {!isMobile && <Resources />}
        <PostsList />
        {!isLaptop && <Tags />}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex gap-4 justify-center`;

export default Home;
