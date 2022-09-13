import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../../common/LoadingSpinner';
import PostsList from '../../../common/PostsList';
import { useGetPostsQuery } from '../../../core/features/posts/postsApiSlice';

const Posts = ({ value }) => {
  const { data: posts, isLoading } = useGetPostsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(posts?.filter(post => post.title.toLowerCase().includes(value.toLowerCase())));
  }, [value, posts]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    filteredPosts && <PostsList posts={filteredPosts} enableImages={false} />
  );
};

const Wrapper = tw.div`bg-blue`;

export default Posts;
