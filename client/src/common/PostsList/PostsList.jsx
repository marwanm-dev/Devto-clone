import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import { useGetPostsQuery } from '../../core/features/posts/postsApiSlice';
import { reset, selectSearchValue, setPlaceholder } from '../../core/features/search/searchSlice';
import LoadingSpinner from '../LoadingSpinner';
import Post from './components/Post';

const PostsList = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const { data: posts, isLoading } = useGetPostsQuery([], { refetchOnMountOrArgChange: true });
  const filteredPosts =
    posts && searchValue ? posts.filter(post => post.title.includes(searchValue)) : posts;

  useEffect(() => {
    dispatch(setPlaceholder('Search posts by title..'));
    dispatch(reset());
  }, []);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <Wrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && filteredPosts?.length > 0 ? (
        filteredPosts.map((post, i) => (
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
