import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../../common/LoadingSpinner';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from '../../../core/features/comments/commentsApiSlice';
import useRequireAuth from '../../../hooks/useRequireAuth';
import Comment from './Comment';

const Comments = ({ postId }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(postId, {
    refetchOnMountOrArgChange: true,
  });
  const rootComments =
    comments && comments.filter(comment => !comment.parentComment).sort((a, b) => b.date > a.date);
  const replies =
    comments && comments.filter(comment => comment.parentComment).sort((a, b) => b.date < a.date);

  const [body, setBody] = useState('');
  const [postComment] = usePostCommentMutation();
  const currentUser = useSelector(selectCurrentUser);
  const { isAuthed, handleAuth } = useRequireAuth();

  const handleNewComment = () => {
    if (!isAuthed) handleAuth();
    if (body) {
      try {
        postComment({ body, author: currentUser.id, parentPost: postId });

        setBody('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Wrapper>
      <CommentContainer>
        <Heading>Discussion ({comments?.length} comments)</Heading>
        {isAuthed && (
          <AddToDiscussion>
            <Avatar src={currentUser.picture.url} />
            <AddComment>
              <Input value={body} onChange={e => setBody(e.target.value)} />
              <Submit onClick={handleNewComment}>Submit</Submit>
            </AddComment>
          </AddToDiscussion>
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          rootComments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              replies={replies.filter(reply => reply.parentComment === comment._id)}
            />
          ))}
      </CommentContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex flex-col gap-sm`;

const CommentContainer = tw.div`flex flex-col`;

const Heading = tw.h2`mb-md`;

const AddToDiscussion = tw.div`flex justify-start items-start gap-sm`;

const Avatar = tw.img`w-10 h-10 rounded-full cursor-pointer`;

const AddComment = tw.div`w-full`;

const Input = styled.input.attrs({
  placeholder: ' Add to Discussion',
})`
  ${tw`outline-none w-full px-3 py-5 bg-white rounded-md focus:border-blue border border-solid border-light-gray`}
`;

const Submit = tw.button`text-white bg-blue py-2 px-3 rounded-md mt-1`;

export default Comments;
