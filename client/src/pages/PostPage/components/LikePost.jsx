import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import useRequireAuth from '../../../hooks/useRequireAuth';
import LoadingController from '../../../common/LoadingController/LoadingController';

const LikePost = ({ likes, isLiked, handleReaction, isLoading }) => {
  const { isAuthed, handleAuth } = useRequireAuth(false);

  const action = isLiked ? 'removeLike' : 'like';
  const effect = isLiked ? 'negative' : 'positive';

  const handleClick = () => {
    if (isAuthed) handleReaction(action, effect, likes, 'isLiked');
    else handleAuth();
  };

  return (
    <ReactionContainer>
      <LoadingController isLoading={isLoading}>
        <HeartIcon isLiked={isLiked} onClick={handleClick}>
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </HeartIcon>
      </LoadingController>
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
