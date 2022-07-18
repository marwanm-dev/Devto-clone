import tw, { styled, theme } from 'twin.macro';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiUnicorn } from 'react-icons/gi';
import { BsBookmark } from 'react-icons/bs';
import useScroll from '../../../hooks/useScroll';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';

const Reactions = ({ previewedUsername, likes, unicorns, bookmarks }) => {
  const { scrollDirection } = useScroll();
  const { username } = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <Wrapper scrollDirection={scrollDirection}>
      <Content>
        <ReactionContainer>
          <HeartIcon>
            <AiOutlineHeart />
          </HeartIcon>
          <TotalReactions>{likes}</TotalReactions>
        </ReactionContainer>
        <ReactionContainer>
          <UnicornIcon>
            <GiUnicorn />
          </UnicornIcon>
          <TotalReactions>{unicorns}</TotalReactions>
        </ReactionContainer>
        <ReactionContainer>
          <BookmarkIcon>
            <BsBookmark />
          </BookmarkIcon>
          <TotalReactions>{bookmarks}</TotalReactions>
        </ReactionContainer>
        {previewedUsername === username && (
          <EditButton onClick={() => navigate('edit')}>Edit</EditButton>
        )}
      </Content>
    </Wrapper>
  );
};

const EditButton = tw.button`w-full rounded-md text-sm border border-solid p-1 bg-gray text-white hover:(text-gray bg-white border-gray)`;

const DeleteButton = tw(EditButton)``;

const Wrapper = styled.div`
  ${({ scrollDirection }) =>
    scrollDirection === 'up' ? `bottom: -100% !important;` : `bottom: 0 !important;`}

  ${tw`w-20 text-2xl flex flex-col items-center gap-sm mt-lg mob:(fixed bottom-0 left-0 bg-white w-full px-lg pt-sm)`}
`;

const Content = tw.div`fixed mob:(static flex items-center justify-between w-full)`;

const ReactionContainer = tw.div`text-center flex items-center flex-col mb-md mob:(mb-sm flex items-center)`;

const HeartIcon = tw.div`p-2 cursor-pointer rounded-full hover:(bg-[rgb(243, 224, 224)] text-[rgb(220, 38, 38)])`;
const UnicornIcon = tw(HeartIcon)`hover:(bg-[rgb(220, 235, 231)] text-[rgb(5, 150, 105)])`;
const BookmarkIcon = tw(HeartIcon)`hover:(bg-[rgb(228, 227, 244)] text-[rgb(116, 108, 233)])`;
const DotsContainer = tw(
  ReactionContainer
)`[& svg]:(mx-auto) rounded-md bg-white p-sm justify-between gap-sm mob:(flex-row)`;

const TotalReactions = tw.p`text-center text-dark-gray`;

export default Reactions;
