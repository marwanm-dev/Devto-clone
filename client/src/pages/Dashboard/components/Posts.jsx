import { nanoid } from '@reduxjs/toolkit';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdOutlineModeComment } from 'react-icons/md';
import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { createPostUrl } from '../../../helpers/string';

const Posts = ({ posts, username, navigate }) => {
  // Todo reactions
  return (
    <Wrapper>
      {posts.map(post => (
        <Post key={nanoid()}>
          <Title onClick={() => navigate(`/${username}/${createPostUrl(post.title, post.id)}`)}>
            {post.title}
          </Title>
          <ReactionsWrapper>
            <Reactions>
              <AiOutlineHeart />
              {post.likes.length + post.bookmarks.length + post.unicorns.length}
            </Reactions>
            <Comments>
              <MdOutlineModeComment />
              {post.comments.length}
            </Comments>
          </ReactionsWrapper>
          <Edit to={`/${username}/${createPostUrl(post.title, post.id)}/edit`}>Edit</Edit>
        </Post>
      ))}
    </Wrapper>
  );
};
const ReactionsWrapper = tw.div`flex items-center gap-sm`;

const Reactions = tw.div`flex items-center gap-2`;

const Comments = tw.div`flex items-center gap-2`;

const Wrapper = tw.div`flex flex-col gap-2`;

const Post = tw.div`p-5 flex items-center justify-between rounded-md border border-light-gray`;

const Title = tw.h3`w-1/3 cursor-pointer hover:text-blue`;

const Edit = tw(Link)`cursor-pointer hover:(text-blue underline)`;

export default Posts;
