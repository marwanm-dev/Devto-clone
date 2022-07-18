import tw, { styled } from 'twin.macro';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdOutlineModeComment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Tags from '../../Tags';
import { createPostUrl } from '../../../helpers/strings';

const Post = ({ post, isFirstPost }) => {
  const navigate = useNavigate();

  return (
    post && (
      <Wrapper>
        {isFirstPost && (
          <Image
            onClick={() =>
              navigate(`/${post.author.username}/${createPostUrl(post.title, post._id)}`)
            }
            src={post.image.url}
          />
        )}
        <Content>
          <Header onClick={() => navigate(`/${post.author.username}`)}>
            <Author src={post.author.picture.url} />
            <AuthorMeta>
              <AuthorName>{post.author.username}</AuthorName>
              <CreatedAt>{post.publishedDate}</CreatedAt>
            </AuthorMeta>
          </Header>
          <Title
            onClick={() =>
              navigate(`/${post.author.username}/${createPostUrl(post.title, post._id)}`)
            }>
            {post.title}
          </Title>
          <Tags tags={post.tags} />
          <Footer>
            <Reactions
              onClick={() =>
                navigate(`/${post.author.username}/${createPostUrl(post.title, post._id)}`)
              }>
              <SumOfReactions>
                <HeartIcon>
                  <AiOutlineHeart />
                </HeartIcon>
                <Total>{post.likes + post.unicorns + post.bookmarks} reactions</Total>
              </SumOfReactions>
              <SumOfComments>
                <CommentIcon>
                  <MdOutlineModeComment />
                </CommentIcon>
                <Total>67 comments</Total>
              </SumOfComments>
            </Reactions>
            <Other>
              <MinutesRead>1 min read</MinutesRead>
              <SaveButton>Save</SaveButton>
            </Other>
          </Footer>
        </Content>
      </Wrapper>
    )
  );
};

const Image = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  cursor: pointer;
`;
const Content = tw.div`px-sm py-md`;
const Header = tw.div`flex justify-between items-center w-max gap-sm mb-2 `;
const Author = tw.img`w-10 h-10 rounded-full cursor-pointer`;
const AuthorMeta = tw.div``;
const AuthorName = tw.h4`text-darker-gray pr-1 pt-1 rounded-md hover:bg-lighter-gray cursor-pointer`;
const CreatedAt = tw.p`text-darker-gray`;
const Title = tw.h1`mb-2 hover:text-blue cursor-pointer`;
const Footer = tw.div`flex justify-between items-center`;
const Reactions = tw.div`flex justify-between items-center gap-md`;
const SumOfReactions = tw.div`flex justify-between items-center gap-2 text-darker-gray rounded-md px-2 py-1 hover:bg-lighter-gray cursor-pointer`;
const HeartIcon = styled.div`
  svg {
    font-size: 1.5rem;
  }
`;
const SumOfComments = tw.div`flex justify-between items-center gap-2 text-darker-gray rounded-md px-2 py-1 hover:bg-lighter-gray cursor-pointer`;
const CommentIcon = styled.div`
  svg {
    font-size: 1.5rem;
  }
`;
const Total = tw.p``;
const Other = tw.div`flex justify-between items-center gap-2`;
const MinutesRead = tw.p`text-darker-gray`;
// Todo onClick save if not authed onClick={() => setShowModal(true)}
const SaveButton = tw.button`px-2 py-1 bg-light-gray hover:bg-gray rounded-md`;
const Wrapper = tw.div`rounded-md w-full overflow-hidden bg-white mb-2`;

export default Post;
