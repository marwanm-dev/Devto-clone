import tw, { styled } from 'twin.macro';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../core/features/auth/authSlice';

const LikePost = ({ likes, isLiked, handleReaction, setAuthModal }) => {
  const token = useSelector(selectCurrentToken);
  const action = isLiked ? 'removeLike' : 'like';
  const effect = isLiked ? 'negative' : 'positive';

  const handleClick = () => {
    if (!token) setAuthModal(true);
    handleReaction(action, effect, likes, 'isLiked');
  };

  return (
    <ReactionContainer>
      <HeartIcon isLiked={isLiked} onClick={handleClick}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </HeartIcon>
      <TotalReactions>{likes && likes.length}</TotalReactions>
    </ReactionContainer>
  );
};
export const ReactionContainer = tw.div`text-center flex items-center flex-col mb-md mob:(mb-sm flex items-center)`;
export const ReactionIcon = tw.div`p-2 cursor-pointer rounded-full`;
export const TotalReactions = tw.p`text-center text-dark-gray`;
const HeartIcon = styled(ReactionIcon)`
  ${({ isLiked }) =>
    isLiked
      ? tw`bg-heart-bg text-heart-text border-solid border-8 border-solid border-heart-bg`
      : tw`hover:(bg-heart-bg text-heart-text)`}
`;

export default LikePost;
