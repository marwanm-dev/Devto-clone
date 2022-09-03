import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import usePostReaction from '../../../hooks/usePostReaction';
import useScroll from '../../../hooks/useScroll';
import BookmarkPost from './BookmarkPost';
import LikePost from './LikePost';
import UnicornPost from './UnicornPost';

const Reactions = ({ post, toInvalidate }) => {
  const { scrollDirection } = useScroll();
  const { username } = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { id, author, likes, unicorns, bookmarks } = post;

  const likesArr = [...likes];
  const unicornsArr = [...unicorns];
  const bookmarksArr = [...bookmarks];

  const { state, handleReaction, isLoading } = usePostReaction(
    id,
    author,
    likesArr,
    unicornsArr,
    bookmarksArr,
    post.title,
    toInvalidate
  );
  const { isLiked, isUnicorned, isBookmarked } = state;

  return (
    <Wrapper scrollDirection={scrollDirection}>
      <Content>
        <LikePost
          likes={likesArr}
          isLiked={isLiked}
          handleReaction={handleReaction}
          isLoading={isLoading}
        />
        <UnicornPost
          unicorns={unicornsArr}
          isUnicorned={isUnicorned}
          handleReaction={handleReaction}
          isLoading={isLoading}
        />
        <BookmarkPost
          bookmarks={bookmarksArr}
          isBookmarked={isBookmarked}
          handleReaction={handleReaction}
          isLoading={isLoading}
        />
        {author.username === username && (
          <EditButton onClick={() => navigate('edit')}>Edit</EditButton>
        )}
      </Content>
    </Wrapper>
  );
};

const EditButton = tw.button`w-full rounded-md text-sm border border-solid p-1 bg-dark-gray text-white hover:(text-dark-gray bg-white border-dark-gray) mob:w-lg`;

const Wrapper = styled.div`
  ${({ scrollDirection }) =>
    scrollDirection === 'up' ? `bottom: -100% !important;` : `bottom: 0 !important;`}

  ${tw`w-20 text-2xl flex flex-col items-center gap-sm mt-lg mob:(fixed bottom-0 left-0 bg-white w-full px-lg pt-sm)`}
`;

const Content = tw.div`fixed mob:(static flex items-center justify-between w-full)`;

export default Reactions;
