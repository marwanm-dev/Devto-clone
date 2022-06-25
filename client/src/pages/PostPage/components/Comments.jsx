import tw, { styled } from 'twin.macro';
import Comment from './Comment';

const Comments = ({ comments }) => {
  return (
    <Wrapper>
      <CommentContainer>
        {comments &&
          comments.map((comment, i) => <Comment key={i} comment={comment} isReply={false} />)}
      </CommentContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex flex-col gap-sm`;

const CommentContainer = tw.div`flex flex-col`;

export default Comments;
