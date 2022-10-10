import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import CommentModifiers from '../../../common/CommentModifiers';
import CommentReactions from '../../../common/CommentReactions';
import Textarea from '../../../common/Textarea/Textarea';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { formatDate } from '../../../helpers/string';
import useToggle from '../../../hooks/useToggle';
import Replies from './Replies';

const Comment = ({ comment, replies, parentCommentIfReply }) => {
    const currentUser = useSelector(selectCurrentUser);
    const [editMode, setEditMode] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);
    const replyRef = useRef(null);
    const [isReplying, toggleIsReplying] = useToggle(false);
    const [submittedReply, setSubmittedReply] = useState(false);
    const [replyBody, setReplyBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (submittedReply) {
            toggleIsReplying(false);
            setReplyBody('');
        }
    }, [submittedReply]);

    useEffect(() => {
        setIsFocused(editMode);
    }, [editMode]);

    useEffect(() => {
        if (isFocused) textareaRef.current.focus();
    }, [isFocused]);

    useEffect(() => {
        if (isReplying) replyRef.current.focus();
    }, [isReplying]);

    return (
        <>
            <Wrapper>
                <CommentContainer>
                    <Avatar
                        onClick={navigate(`/${comment.author.username}`)}
                        src={comment.author?.picture?.url}
                    />
                    <Content isFocused={isFocused}>
                        <Meta>
                            <Name onClick={navigate(`/${comment.author.username}`)}>
                                {comment.author?.name}
                            </Name>
                            <CreatedAt>{formatDate(comment.createdAt)}</CreatedAt>
                        </Meta>

                        <Textarea
                            ref={textareaRef}
                            disabled={!editMode}
                            defaultValue={comment.body}
                        />
                    </Content>
                </CommentContainer>

                <CommentFooter>
                    <CommentReactions
                        likes={comment.likes}
                        parentPost={comment.parentPost}
                        parentComment={parentCommentIfReply || comment.id}
                        id={comment.id}
                        toggleIsReplying={toggleIsReplying}
                        replyBody={replyBody}
                        isReplying={isReplying}
                        setSubmittedReply={setSubmittedReply}
                        submittedReply={submittedReply}
                    />
                    {comment.author?.username === currentUser.username && (
                        <CommentModifiers
                            id={comment.id}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            textareaRef={textareaRef}
                        />
                    )}
                </CommentFooter>

                {isReplying && (
                    <AddToDiscussion>
                        <AddReply>
                            <Textarea
                                ref={replyRef}
                                value={replyBody}
                                onChange={e => setReplyBody(e.target.value)}
                                placeholder='Reply'
                                showOutlines={true}
                                className='px-3 py-5 border border-light-gray'
                            />
                            <Submit onClick={() => setSubmittedReply(true)}>Submit</Submit>
                        </AddReply>
                    </AddToDiscussion>
                )}

                {replies && <Replies replies={replies} parentComment={comment.id} />}
            </Wrapper>
        </>
    );
};

const AddToDiscussion = tw.div`flex justify-start items-start gap-sm`;

const AddReply = tw.div`w-full`;

const Submit = tw.button`text-white bg-blue py-2 px-3 rounded-md mt-1`;

const Meta = tw.div`flex items-center gap-2 mb-sm`;

const Name = tw.p`font-bold hover:text-blue`;

const CreatedAt = tw.p`text-darker-gray italic`;

const Avatar = tw.img`w-10 h-10 rounded-full cursor-pointer`;

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
