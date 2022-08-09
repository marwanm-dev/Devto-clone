import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import AuthorDetails from '../../../common/AuthorDetails';
import SyntaxHighlight from '../../../common/SyntaxHighlight';
import Tags from '../../../common/Tags';
import Comments from './Comments';

const Post = ({ post, isLaptop }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Image src={post.image.url} />
      <Content>
        <Header>
          <Author
            src={post.author.picture.url}
            onClick={() => navigate(`/${post.author.username}`)}
          />
          <AuthorMeta>
            <AuthorName>{post.author.username}</AuthorName>
            <CreatedAt>{post.date}</CreatedAt>
          </AuthorMeta>
        </Header>
        <Title>{post.title}</Title>
        <Tags tags={post.tags} isColored={true} />
        <PostBody>
          <ReactMarkdown children={post.body} components={SyntaxHighlight} />
        </PostBody>
        <CommentsContainer>{post.comments && <Comments postId={post._id} />}</CommentsContainer>
      </Content>
      {isLaptop && <AuthorDetails author={post.author} />}
    </Wrapper>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: contain;
  cursor: pointer;
`;

const Header = tw.div`flex justify-between items-center w-max gap-sm mt-sm`;

const Author = tw.img`w-10 h-10 rounded-full cursor-pointer`;
const AuthorMeta = tw.div``;
const AuthorName = tw.h4`text-darker-gray pr-1 pt-1 rounded-md hover:bg-lighter-gray cursor-pointer`;
const CreatedAt = tw.p`text-darker-gray`;

const Title = tw.h1`my-sm`;

const PostBody = tw.div`mt-md pb-md border-b border-light-gray border-solid`;

const CommentsContainer = styled.div`
  > *:not(:first-child) {
    ${tw`mt-sm`}
  }
  ${tw`mt-md`}
`;

const Content = tw.div`px-lg my-lg mob:(px-0)`;

const Wrapper = tw.div`w-full h-full rounded-md overflow-hidden bg-white`;

export default Post;
