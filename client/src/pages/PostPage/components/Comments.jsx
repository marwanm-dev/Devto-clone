import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Textarea from '../../../common/Textarea/Textarea';
import socketContext from '../../../context/SocketContext';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from '../../../core/features/comments/commentsApiSlice';
import useRequireAuth from '../../../hooks/useRequireAuth';
import Comment from './Comment';

const Comments = ({ postTitle, postAuthor, postId }) => {
  const {
    data: comments,
    isLoading,
    refetch,
  } = useGetCommentsQuery(postId, {
    refetchOnMountOrArgChange: true,
  });

  const rootComments = comments && comments.filter(comment => !comment.parentComment);
  const replies = comments && comments.filter(comment => comment.parentComment);

  const [body, setBody] = useState('');
  const [postComment, { isLoading: newCommentIsLoading }] = usePostCommentMutation();
  const currentUser = useSelector(selectCurrentUser);
  const { isAuthed, handleAuth } = useRequireAuth();
  const { socket } = useContext(socketContext);
  const addCommentRef = useRef(null);

  const handleNewComment = () => {
    refetch();
    if (!isAuthed) handleAuth();
    if (body) {
      try {
        socket?.emit('comment', {
          sender: currentUser,
          receiver: postAuthor,
          post: { title: postTitle, id: postId },
        });
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
        <AddToDiscussion>
          <Avatar src={currentUser?.picture?.url || '../../assets/images/default-avatar.png'} />
          <AddComment>
            <Textarea
              ref={addCommentRef}
              value={body}
              placeholder='Add to discussion..'
              onChange={e => setBody(e.target.value)}
              showOutlines={true}
              className='px-3 py-5  border border-light-gray'
            />
            <Submit onClick={handleNewComment} disabled={newCommentIsLoading}>
              Submit
            </Submit>
          </AddComment>
        </AddToDiscussion>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          rootComments?.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              replies={replies.filter(reply => reply.parentComment === comment.id)}
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

const Avatar = tw.img`w-10 h-10 rounded-full`;

const AddComment = tw.div`w-full`;

const Submit = tw.button`text-white bg-blue py-2 px-3 rounded-md mt-1 disabled:(bg-light-blue cursor-not-allowed)`;

export default Comments;
