import tw, { styled } from 'twin.macro';
import Post from './components/Post';
import LoadingSpinner from '../LoadingSpinner';
import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../core/features/posts/postsSlice';
import { useGetPostsQuery } from '../../core/features/posts/postsApiSlice';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const handlePosts = async () => {
    const data = await dispatch(getPosts());
    setPosts(data.payload);
  };

  useEffect(() => {
    handlePosts();
  }, []);

  // const { data: posts, isLoading, isError } = useGetPostsQuery();

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return (
    <Wrapper>
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Post post={post} isFirstPost={i === 0 ? true : false} key={nanoid()} />
        ))
      ) : (
        <p>No posts to display</p>
      )}
      {/* {isLoading && <LoadingSpinner />}
      {!isLoading && posts.length > 0 ? (
        posts.map(post => <Post post={post} isFirstPost={i === 0 ? true : false} key={nanoid()} />)
      ) : (
        <p>No posts to display</p>
      )} */}
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full`;

export default PostsList;
