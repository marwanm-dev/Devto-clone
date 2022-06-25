import tw, { styled } from 'twin.macro';
import CommentReactions from '../../../common/CommentReactions';
import CommentModifiers from '../../../common/CommentModifiers';
import Replies from './Replies';

const Comment = ({ comment, isReply }) => {
  return (
    <>
      <Wrapper>
        <CommentContainer>
          <Avatar src={comment.picture} />
          <Content>
            <Meta>
              <Name>{comment.author}</Name>
              <CreatedAt>{comment.createdAt}</CreatedAt>
            </Meta>
            <Body>{comment.body}</Body>
          </Content>
        </CommentContainer>

        <CommentFooter>
          <CommentReactions likes={comment.likes} />
          {comment.isTheAuthenticatedUser && <CommentModifiers />}
        </CommentFooter>

        {!isReply && <Replies replies={comment.replies} />}
      </Wrapper>
    </>
  );
};

const Meta = tw.div`flex items-center gap-2 mb-sm`;

const Name = tw.p`font-bold`;

const CreatedAt = tw.p`text-darker-gray italic`;

const Avatar = tw.img`w-10 rounded-full cursor-pointer`;

const Body = tw.p``;

const Content = tw.div`w-full px-3 py-5 bg-white rounded-md border border-solid border-light-gray`;

const CommentContainer = tw.div`flex items-start gap-sm mb-sm`;

const CommentFooter = tw.div`flex flex-wrap gap-md mob:gap-sm items-center mb-sm`;

const Wrapper = styled.div`
  ${CommentFooter} {
    ${tw`ml-[calc(3.5rem + .75rem)]`}
  }
`;

export default Comment;
