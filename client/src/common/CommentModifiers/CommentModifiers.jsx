import tw from 'twin.macro';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../core/features/comments/commentsApiSlice';
import LoadingController from '../LoadingController';

const CommentModifier = ({ id, editMode, setEditMode, textareaRef }) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const handleDelete = () => {
    deleteComment(id);
  };

  return (
    <Wrapper>
      {editMode ? (
        <>
          <Submit
            onClick={() => {
              if (textareaRef.current.value) {
                updateComment({ id, body: textareaRef.current.value });
                setEditMode(false);
              }
            }}>
            Submit
          </Submit>
          <CancelButton
            onClick={() => {
              textareaRef.current.value = textareaRef.current.defaultValue;
              setEditMode(false);
            }}>
            Cancel
          </CancelButton>
        </>
      ) : (
        <>
          <EditButton onClick={() => setEditMode(true)}>Edit</EditButton>
          <LoadingController isLoading={isLoading}>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </LoadingController>
        </>
      )}
    </Wrapper>
  );
};

const Button = tw.button`text-sm text-white rounded-md py-2 px-3`;

const DeleteButton = tw(Button)`bg-red`;

const EditButton = tw(Button)`bg-blue`;

const Submit = tw(Button)`bg-blue`;

const CancelButton = tw(Button)`bg-red`;

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentModifier;
