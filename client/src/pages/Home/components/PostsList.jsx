import tw, { styled } from 'twin.macro';
import Post from './Post';

const PostsList = () => {
  const posts = [1, 2, 3];

  return (
    <Wrapper>
      {posts.map((post, i) => (
        <Post isFirstPost={i === 0 ? true : false} key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full`;

export default PostsList;
