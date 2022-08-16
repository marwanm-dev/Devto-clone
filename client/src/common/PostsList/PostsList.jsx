import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw from 'twin.macro';
import { useGetPostsQuery } from '../../core/features/posts/postsApiSlice';
import { selectSearchValue } from '../../core/features/search/searchSlice';
import usePlaceholder from '../../hooks/usePlaceholder';
import LoadingSpinner from '../LoadingSpinner';
import Post from './components/Post';

const PostsList = ({ tagname = null }) => {
  const searchValue = useSelector(selectSearchValue);
  const { data: posts, isLoading } = useGetPostsQuery([null], {
    refetchOnMountOrArgChange: true,
  });
  const [filteredPosts, setFilteredPosts] = useState(posts);
  usePlaceholder('posts by title');

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    setFilteredPosts(
      searchValue && !tagname
        ? posts?.filter(post => post.title.includes(searchValue))
        : !searchValue && tagname
        ? posts?.filter(post => post.tags.some(tag => tag.name === tagname))
        : posts
    );
  }, [searchValue, tagname]);

  return (
    <Wrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && filteredPosts?.length > 0 ? (
        filteredPosts.map((post, i) => (
          <Post
            post={post}
            isFirstPost={i === 0 ? true : false}
            filteredTag={tagname}
            key={nanoid()}
          />
        ))
      ) : (
        <p>No posts to display</p>
      )}
    </Wrapper>
  );
};
const Wrapper = tw.div`w-full`;

export default PostsList;
