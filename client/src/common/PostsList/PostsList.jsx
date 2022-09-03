import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw from 'twin.macro';
import { selectSearchValue } from '../../core/features/search/searchSlice';
import usePlaceholder from '../../hooks/usePlaceholder';
import Placeholder from '../Placeholder';
import Post from './components/Post';

const PostsList = ({ posts, filteredTag, toInvalidate }) => {
  const searchValue = useSelector(selectSearchValue);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  usePlaceholder('posts by title');

  useEffect(() => {
    setFilteredPosts(
      searchValue
        ? posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
        : posts
    );
  }, [searchValue, posts]);

  return (
    <Wrapper>
      {filteredPosts.length ? (
        filteredPosts.map((post, i) => (
          <Post
            post={post}
            isFirstPost={i === 0}
            filteredTag={filteredTag}
            key={nanoid()}
            toInvalidate={toInvalidate}
          />
        ))
      ) : (
        <Placeholder type='posts' />
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full`;

export default PostsList;
