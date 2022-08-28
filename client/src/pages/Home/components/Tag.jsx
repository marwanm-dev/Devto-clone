import { nanoid } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

const Tag = ({ tag }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link to={`tags/${tag.name}`}>
        <TagName>#{tag.name}</TagName>
      </Link>
      {tag.posts.slice(0, 5).map(post => (
        <PostWrapper
          key={nanoid()}
          onClick={() =>
            navigate(`/${post.author.username}/${post.title.replace(/\ /g, '+')}-${post.id}`)
          }>
          <Title>{post.title}</Title>
          <NumOfComments>{post.comments.length} comments</NumOfComments>
        </PostWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`rounded-md`}
  *:not(a) {
    ${tw`p-3 hover:text-blue cursor-pointer`}
  }
`;

const TagName = tw.h2`pb-10 bg-lightest-gray border-lighter-gray border-b`;

const Title = tw.h4`bg-lightest-gray hover:bg-white`;

const PostWrapper = tw.div`py-3 bg-lightest-gray hover:bg-white border-lighter-gray border-b`;

const NumOfComments = tw.h4`p-0 bg-lightest-gray hover:bg-white`;

export default Tag;
