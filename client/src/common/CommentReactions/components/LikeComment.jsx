import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import tw, { styled } from 'twin.macro';

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
  ${tw`rounded-md py-1 px-2 flex items-center gap-2 text-2xl cursor-pointer hover:bg-lighter-gray`}
  ${({ isLiked }) => isLiked && tw`bg-heart-bg hover:bg-heart-bg`}
`;

const Count = tw.p``;

export default LikeComment;
