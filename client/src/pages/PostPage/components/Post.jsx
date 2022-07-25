import tw, { styled } from 'twin.macro';
import Tags from '../../../common/Tags';
import Comments from './Comments';
import AuthorDetails from '../../../common/AuthorDetails';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlight from '../../../common/SyntaxHighlight';

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
        <Tags tags={post.tags} />
        <PostBody>
          <ReactMarkdown children={post.body} components={SyntaxHighlight} />
        </PostBody>
        <CommentsContainer>
          <Heading>Discussion (7 comments)</Heading>
          <AddToDiscussion>
            <Avatar src={post.author.picture.url} />
            <AddComment>
              <Input />
              <Submit>Submit</Submit>
            </AddComment>
          </AddToDiscussion>
          <Comments
            comments={[
              {
                picture: '../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg',
                author: 'John smith',
                createdAt: 'Jun 13',
                body: 'yahooasdadsadadsadasdsadsad sdd 13 fz zxc ssfddf qf1fo!!',
                isTheAuthenticatedUser: true,
                likes: 3,
                replies: [],
              },
              {
                picture: '../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg',
                author: 'marodevv',
                createdAt: 'May 22, 2021',
                body: 'yahooo!!',
                isTheAuthenticatedUser: false,
                likes: 3,
                replies: [
                  {
                    picture: '../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg',
                    author: 'marodevv',
                    createdAt: 'May 22, 2021',
                    body: 'reply1!!',
                    isTheAuthenticatedUser: true,
                    likes: 3,
                  },
                  {
                    picture: '../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg',
                    author: 'marodevv',
                    createdAt: 'May 22, 2021',
                    body: 'reply2!!',
                    isTheAuthenticatedUser: false,
                    likes: 3,
                  },
                ],
              },
            ]}
          />
        </CommentsContainer>
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

const Heading = tw.h2``;

const AddToDiscussion = tw.div`flex justify-start items-start gap-sm`;

const Avatar = tw.img`w-10 h-10 rounded-full cursor-pointer`;

const AddComment = tw.div`w-full`;

const Input = styled.input.attrs({
  placeholder: ' Add to Discussion',
})`
  ${tw`outline-none w-full px-3 py-5 bg-white rounded-md focus:border-blue border border-solid border-light-gray`}
`;

const Submit = tw.button`w-20 text-white bg-blue py-2 px-1 rounded-md mt-sm`;

const Content = tw.div`px-lg my-lg mob:(px-0)`;

const Wrapper = tw.div`w-full h-full rounded-md overflow-hidden bg-white`;

export default Post;
