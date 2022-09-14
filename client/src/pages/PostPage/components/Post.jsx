import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import AuthorDetails from '../../../common/AuthorDetails';
import CustomMarkdown from '../../../common/CustomMarkdown';
import Tags from '../../../common/Tags';
import { formatDate } from '../../../helpers/string';
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
            <AuthorName>{post.author.name}</AuthorName>
            <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            {formatDate(post.updatedAt) !== formatDate(post.createdAt) && (
              <UpdatedAt>{`Updated ${formatDate(post.updatedAt)}`}</UpdatedAt>
            )}
          </AuthorMeta>
        </Header>
        <Title>{post.title}</Title>
        <Tags tags={post.tags} isColored={true} />
        <PostBody>
          <CustomMarkdown children={post.body} />
        </PostBody>
        <CommentsContainer>
          {post.comments && (
            <Comments postTitle={post.title} postAuthor={post.author} postId={post.id} />
          )}
        </CommentsContainer>
      </Content>
      {isLaptop && <AuthorDetails post={post} />}
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

const Author = tw.img`w-12 h-12 rounded-full cursor-pointer`;
const AuthorMeta = tw.div``;
const AuthorName = tw.h4`text-darker-gray pr-1 pt-1 rounded-md hover:bg-lighter-gray cursor-pointer`;
const CreatedAt = tw.p`text-darker-gray`;
const UpdatedAt = tw.p`text-darker-gray`;

const Title = tw.h1`my-sm`;

const PostBody = tw.div`mt-md pb-md border-b border-light-gray border-solid`;

const CommentsContainer = styled.div`
  > *:not(:first-child) {
    ${tw`mt-sm`}
  }
  ${tw`mt-md`}
`;

const Content = tw.div`px-lg my-lg mob:(px-sm)`;

const Wrapper = tw.div`w-full h-full rounded-md overflow-hidden bg-white shadow`;

export default Post;
