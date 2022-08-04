import { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';

const ReplyComment = ({ isReplying, toggleIsReplying }) => {
  return (
    <ReactionContainer onClick={toggleIsReplying}>
      <FaRegComment />
      <Text>{isReplying ? 'Cancel' : 'Reply'}</Text>
    </ReactionContainer>
  );
};

const ReactionContainer = tw.div`cursor-pointer rounded-md py-1 px-2 hover:bg-lighter-gray flex items-center gap-2 text-2xl`;

const Text = tw.p``;

export default ReplyComment;
