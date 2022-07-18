import tw, { theme } from 'twin.macro';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import RouteWrapper from '../../common/RouteWrapper';
import NotFound from '../../common/NotFound';
import useBreakpoint from '../../hooks/useBreakpoint';
import Reactions from './components/Reactions';
import Post from './components/Post';
import AuthorDetails from '../../common/AuthorDetails';
import { getPost } from '../../core/features/posts/postsSlice';

const PostPage = () => {
  const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));

  const [post, setPost] = useState();
  const dispatch = useDispatch();

  const { username, postUrl } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { payload } = await dispatch(getPost(`${username}/${postUrl}`));
      setPost(payload);
    };

    fetchPost();
  }, []);

  return (
    <RouteWrapper>
      {post ? (
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
      )}
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex gap-4`;

export default PostPage;
