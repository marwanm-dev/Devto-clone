import tw, { styled } from 'twin.macro';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiUnicorn } from 'react-icons/gi';
import { BsBookmark } from 'react-icons/bs';
import useScroll from '../../../hooks/useScroll';

const Reactions = () => {
  const { scrollDirection } = useScroll();

  return (
    <Wrapper scrollDirection={scrollDirection}>
      <Content>
        <ReactionContainer>
          <HeartIcon>
            <AiOutlineHeart />
          </HeartIcon>
          <TotalReactions>37</TotalReactions>
        </ReactionContainer>
        <ReactionContainer>
          <UnicornIcon>
            <GiUnicorn />
          </UnicornIcon>
          <TotalReactions>12</TotalReactions>
        </ReactionContainer>
        <ReactionContainer>
          <BookmarkIcon>
            <BsBookmark />
          </BookmarkIcon>
          <TotalReactions>2</TotalReactions>
        </ReactionContainer>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ scrollDirection }) =>
    scrollDirection === 'up' ? `bottom: -100% !important;` : `bottom: 0 !important;`}

  ${tw`w-20 text-2xl flex flex-col items-center gap-sm mt-lg mob:(fixed bottom-0 left-0 bg-white w-full px-lg pt-sm)`}
`;

const Content = tw.div`fixed mob:(static flex items-center justify-between w-full)`;

const ReactionContainer = tw.div`mb-md mob:(mb-sm flex items-center)`;

const HeartIcon = tw.div`p-2 cursor-pointer rounded-full hover:(bg-[rgb(243, 224, 224)] text-[rgb(220, 38, 38)])`;
const UnicornIcon = tw(HeartIcon)`hover:(bg-[rgb(220, 235, 231)] text-[rgb(5, 150, 105)])`;
const BookmarkIcon = tw(HeartIcon)`hover:(bg-[rgb(228, 227, 244)] text-[rgb(116, 108, 233)])`;

const TotalReactions = tw.p`text-center text-dark-gray`;

export default Reactions;
