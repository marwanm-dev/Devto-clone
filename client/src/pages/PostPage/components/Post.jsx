import tw, { styled } from 'twin.macro';
import Tags from '../../../common/Tags';
import Comments from './Comments';
import AuthorDetails from '../../../common/AuthorDetails';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlight from '../../../common/SyntaxHighlight';

const Post = ({ isLaptop }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Image src='../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg' />
      <Content>
        <Header>
          <Author
            src='../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg'
            onClick={() => navigate('/users/:username')}
          />
          <AuthorMeta>
            <AuthorName>Ben Halpern</AuthorName>
            <CreatedAt>Jun 13</CreatedAt>
          </AuthorMeta>
        </Header>
        <Title>Meme Monday!</Title>
        <Tags />
        <PostBody>
          <ReactMarkdown components={SyntaxHighlight}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad ullam voluptatibus
            quas numquam animi? Suscipit maxime consequuntur sunt dolore natus, veritatis dicta!
            Repellendus ipsa minima molestiae voluptas hic illum, porro deleniti asperiores impedit
            quas dolores laudantium blanditiis ea quisquam illo quibusdam debitis. Itaque eligendi
            magnam esse, atque qui laudantium. Quae repudiandae nesciunt nam, soluta porro unde
            accusantium amet. Est ducimus ea commodi soluta accusantium quod quas a impedit,
            asperiores beatae similique error! Assumenda debitis enim ad dolor. Est ut praesentium
            vel dolorem itaque ea dolorum veniam rem eligendi, magni cupiditate possimus ad
            obcaecati sapiente corporis sunt quisquam quas a. Laudantium itaque repellendus qui
            expedita laborum, dicta beatae eveniet, ratione tempore nam pariatur quas magnam aperiam
            ab. Debitis hic omnis, voluptatum libero quasi neque ipsum, eaque quibusdam quae
            perferendis laboriosam rerum at beatae iure voluptas maiores consectetur dolorem. Aut
            praesentium at, obcaecati voluptatibus ut nostrum recusandae architecto minus explicabo
            accusamus!
          </ReactMarkdown>
        </PostBody>
        <CommentsContainer>
          <Heading>Discussion (7 comments)</Heading>
          <AddToDiscussion>
            <Avatar src='../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg' />
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
      {isLaptop && <AuthorDetails />}
    </Wrapper>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Header = tw.div`flex justify-between items-center w-max gap-sm mt-sm`;

const Author = tw.img`w-10 rounded-full cursor-pointer`;
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

const Avatar = tw.img`w-10 rounded-full cursor-pointer`;

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
