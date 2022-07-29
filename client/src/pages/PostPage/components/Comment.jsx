import tw, { styled } from 'twin.macro';
import CommentReactions from '../../../common/CommentReactions';
import CommentModifiers from '../../../common/CommentModifiers';
import Replies from './Replies';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { useEffect, useState, useRef } from 'react';

const Comment = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [editMode, setEditMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState();
  const textareaRef = useRef(null);

  const handleTextareaHeight = () => setTextareaHeight(textareaRef.current.scrollHeight);

  useEffect(() => {
    setIsFocused(editMode);
  }, [editMode]);

  useEffect(() => {
    if (isFocused) textareaRef.current.focus();
  }, [isFocused]);

  useEffect(() => {
    handleTextareaHeight();
  }, []);

  return (
    <>
      <Wrapper>
        <CommentContainer>
          <Avatar src={comment.author?.picture?.url} />
          <Content isFocused={isFocused}>
            <Meta>
              <Name>{comment.author?.name}</Name>
              <CreatedAt>{comment.date}</CreatedAt>
            </Meta>

            <TextArea
              onChange={handleTextareaHeight}
              textareaHeight={textareaHeight}
              disabled={!editMode}
              ref={textareaRef}
              defaultValue={comment.body}
            />
          </Content>
        </CommentContainer>

        <CommentFooter>
          <CommentReactions
            likes={comment.likes}
            parentPost={comment.parentPost}
            id={comment._id}
          />
          {comment.author?.username === currentUser.username && (
            <CommentModifiers
              id={comment._id}
              editMode={editMode}
              setEditMode={setEditMode}
              textareaRef={textareaRef}
            />
          )}
        </CommentFooter>

        {/* {isReply && <Replies replies={comment.replies} />} */}
      </Wrapper>
    </>
  );
};

const Meta = tw.div`flex items-center gap-2 mb-sm`;

const Name = tw.p`font-bold`;

const CreatedAt = tw.p`text-darker-gray italic`;

const Avatar = tw.img`w-10 h-10 rounded-full cursor-pointer`;

const TextArea = styled.textarea`
  height: ${({ textareaHeight }) => textareaHeight}px;
  ${tw`w-full resize-none outline-none`}
`;

const Content = styled.div`
  ${tw`w-full h-full px-3 py-5 bg-white rounded-md border border-solid border-light-gray`}
  ${({ isFocused }) => isFocused && tw`border-blue`}
`;

const CommentContainer = tw.div`flex items-start gap-sm mb-sm`;

const CommentFooter = tw.div`flex flex-wrap gap-md mob:gap-sm items-center mb-sm`;

const Wrapper = styled.div`
  ${tw`mt-sm`}
  ${CommentFooter} {
    ${tw`ml-[calc(3.5rem + .75rem)]`}
  }
`;

export default Comment;
