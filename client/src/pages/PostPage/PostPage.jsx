import tw, { theme } from 'twin.macro';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RouteWrapper from '../../common/RouteWrapper';
import NotFound from '../../common/NotFound';
import useBreakpoint from '../../hooks/useBreakpoint';
import Reactions from './components/Reactions';
import Post from './components/Post';
import AuthorDetails from '../../common/AuthorDetails';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useGetPostQuery } from '../../core/features/posts/postsApiSlice';

const PostPage = () => {
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  const { username, postUrl } = useParams();
  const { data: post, isLoading } = useGetPostQuery(`${username}/${postUrl}`);

  return (
    <RouteWrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        (post ? (
          <Wrapper>
            <Reactions
              previewedUsername={username}
              likes={post.likes}
              unicorns={post.unicorns}
              bookmarks={post.bookmarks}
            />
            <Post post={post} isLaptop={isLaptop} />
            {!isLaptop && <AuthorDetails isLaptop={isLaptop} author={post.author} />}
          </Wrapper>
        ) : (
          <NotFound />
        ))}
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex gap-4`;

export default PostPage;
