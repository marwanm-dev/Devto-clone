import { useSelector } from 'react-redux';
import tw, { theme } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import PostsList from '../../common/PostsList';
import Resources from '../../common/Resources';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetPostsQuery } from '../../core/features/posts/postsApiSlice';
import useBreakpoint from '../../hooks/useBreakpoint';
import Tags from './components/Tags';

const Home = ({ saved }) => {
  const isMobile = useBreakpoint(theme`screens.mob.max`.replace('px', ''));
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));
  const { id } = useSelector(selectCurrentUser);
  const { data: posts, isLoading } = useGetPostsQuery(saved ? id : null, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <RouteWrapper>
      <Wrapper>
        {!isMobile && <Resources saved={saved} />}
        {isLoading ? <LoadingSpinner /> : <PostsList posts={posts} />}
        {!isLaptop && <Tags />}
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1``;

const Wrapper = tw.div`flex gap-4 justify-center`;

export default Home;
