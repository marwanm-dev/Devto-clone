import tw, { styled } from 'twin.macro';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

const CommentReactions = ({ likes }) => {
  return (
    <Wrapper>
      <ReactionContainer onClick={() => null}>
        <AiOutlineHeart />
        <Count>{likes} likes</Count>
      </ReactionContainer>
      <ReactionContainer onClick={() => null}>
        <FaRegComment />
        <Count>Reply</Count>
      </ReactionContainer>
    </Wrapper>
  );
};

const ReactionContainer = tw.div`cursor-pointer rounded-md py-1 px-2 hover:bg-lighter-gray flex items-center gap-2 text-2xl`;

const Count = tw.p``;

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentReactions;
