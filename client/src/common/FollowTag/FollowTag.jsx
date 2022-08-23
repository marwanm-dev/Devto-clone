import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useHandleFollowMutation } from '../../core/features/tags/tagsApiSlice';
import { decreaseOpacity } from '../../helpers/utils';

const FollowTag = ({ tag, isFollowed }) => {
  const { id: userId } = useSelector(selectCurrentUser);
  const [handleFollow] = useHandleFollowMutation();

  return (
    <FollowButton
      bg={decreaseOpacity(tag.hashtagColor, 0.5)}
      color={tag.hashtagColor}
      isFollowed={isFollowed}
      onClick={() => {
        handleFollow({
          name: tag.name,
          action: isFollowed ? 'unFollow' : 'follow',
          userId,
          tagId: tag._id,
        });
      }}>
      {isFollowed ? 'Following' : 'Follow'}
    </FollowButton>
  );
};

const FollowButton = styled.button`
  color: ${props => (props.isFollowed ? props.color : 'white')};
  background: ${props => (props.isFollowed ? 'transparent' : props.color)};
  border: 2px solid ${({ color }) => color};
  ${tw`max-w-lg rounded-md px-2 py-1 text-sm font-semibold ml-2`};
  ${props => !props.isFollowed && `&:hover {background: ${props.bg};border-color: ${props.bg};}`};
`;

export default FollowTag;
