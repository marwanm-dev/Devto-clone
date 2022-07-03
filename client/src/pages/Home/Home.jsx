import tw, { theme } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import Resources from '../../common/Resources';
import PostsList from '../../common/PostsList';
import Tags from './components/Tags';
import useBreakpoint from '../../hooks/useBreakpoint';
import axios from '../../api/axios';

const Home = () => {
  const isMobile = useBreakpoint(theme`screens.mob.max`.replace('px', ''));
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  const handleRefresh = async () => {
    const response = await axios.get('/refresh', { withCredentials: true });
    console.log(response);
    // set new access token if refresh token still valid
    // dispatch(setCredentials({}));

    // otherwise logout
    // dispatch(setCredentials({}));

    return response.data.accessToken;
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <button style={{ background: 'green', padding: '1rem' }} onClick={handleRefresh}>
          Refresh access token
        </button>
        {!isMobile && <Resources />}
        <PostsList />
        {!isLaptop && <Tags />}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex gap-4 justify-center`;

export default Home;
