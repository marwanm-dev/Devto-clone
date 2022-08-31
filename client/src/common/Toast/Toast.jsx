import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
import { GiUnicorn } from 'react-icons/gi';

const Toast = ({ senderUsername, message, picture, reactionType, url }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(url)}>
      <Img src={picture} />
      <Message>
        {message}
        {reactionType && (
          <Reaction reactionType={reactionType}>
            {reactionType === 'like' ? (
              <AiFillHeart />
            ) : reactionType === 'unicorn' ? (
              <GiUnicorn />
            ) : (
              <BsBookmarkFill />
            )}
          </Reaction>
        )}
      </Message>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-sm select-none`;

const Img = tw.img`w-12 h-12 rounded-full cursor-pointer`;

const Message = tw.p`flex items-center`;

const Reaction = styled.div`
  ${tw`flex items-center text-xl`}
  ${({ reactionType }) =>
    reactionType === 'like'
      ? tw`text-heart-text`
      : reactionType === 'unicorn'
      ? tw`text-unicorn-text`
      : tw`text-bookmark-text`}
`;

export default Toast;
