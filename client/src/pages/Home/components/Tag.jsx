import { nanoid } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Hashtag from '../../../common/Hashtag';

const Tag = ({ tag }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link to={`tags/${tag.name}`}>
        <TagName>
          <Hashtag />
          {tag.name}
        </TagName>
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
  ${tw`rounded-lg overflow-hidden shadow-sm hover:shadow`}
  *:not(a,svg,div) {
    ${tw`p-3 cursor-pointer`}
  }
  *:not(a, svg) {
    ${tw`hover:text-blue`}
  }
`;

const TagName = tw.h2`bg-white border-lighter-gray border-b`;

const Title = tw.h4`bg-white`;

const PostWrapper = tw.div`py-3 bg-white border-lighter-gray border-b`;

const NumOfComments = tw.h4`p-0 bg-white`;

export default Tag;
