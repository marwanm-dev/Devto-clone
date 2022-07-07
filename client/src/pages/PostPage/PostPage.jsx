import tw, { theme } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import useBreakpoint from '../../hooks/useBreakpoint';
import Reactions from './components/Reactions';
import Post from './components/Post';
import AuthorDetails from '../../common/AuthorDetails';

const PostPage = () => {
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  // Todo get current post from params and postsSlice

  return (
    <RouteWrapper>
      <Wrapper>
        <Reactions />
        <Post isLaptop={isLaptop} />
        {!isLaptop && <AuthorDetails />}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex gap-4`;

export default PostPage;
