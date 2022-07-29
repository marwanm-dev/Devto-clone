import tw, { styled } from 'twin.macro';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const LikeComment = ({ handleLike, likes, isLiked }) => {
  return (
    <ReactionContainer isLiked={isLiked} onClick={handleLike}>
      <HeartIcon isLiked={isLiked}>{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}</HeartIcon>
      <Count>{likes && likes.length} likes</Count>
    </ReactionContainer>
  );
};

const HeartIcon = styled.div`
  ${({ isLiked }) => isLiked && tw`text-heart-text`}
`;

const ReactionContainer = styled.div`
  ${tw`cursor-pointer rounded-md py-1 px-2 hover:bg-lighter-gray flex items-center gap-2 text-2xl`}
  ${({ isLiked }) => isLiked && tw`bg-heart-bg hover:bg-heart-bg`}
`;

const Count = tw.p``;

export default LikeComment;
