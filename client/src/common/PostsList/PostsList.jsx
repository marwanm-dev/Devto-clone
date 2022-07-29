import tw from 'twin.macro';
import Post from './components/Post';
import LoadingSpinner from '../LoadingSpinner';
import { nanoid } from '@reduxjs/toolkit';
import { useGetPostsQuery } from '../../core/features/posts/postsApiSlice';

const PostsList = () => {
  const { data: posts, isLoading } = useGetPostsQuery([], {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Wrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && posts?.length > 0 ? (
        posts.map((post, i) => (
          <Post post={post} isFirstPost={i === 0 ? true : false} key={nanoid()} />
        ))
      ) : (
        <p>No posts to display</p>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full`;

export default PostsList;
