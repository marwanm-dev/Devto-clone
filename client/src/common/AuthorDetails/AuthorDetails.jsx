import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import SocketContext from '../../context/SocketContext';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useHandleUserFollowMutation } from '../../core/features/users/usersApiSlice';
import { formatDate } from '../../helpers/string';
import LoadingController from '../LoadingController/LoadingController';

const AuthorDetails = ({ isLaptop, post }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [handleUserFollow, { isLoading }] = useHandleUserFollowMutation();
  const isFollowed = post?.author?.followers?.includes(currentUser.id);
  const { socket } = useContext(SocketContext);

  const handleFollow = async () => {
    if (!isFollowed)
      socket.emit('follow', {
        sender: currentUser,
        receiver: post?.author,
      });
    await handleUserFollow({
      previewedUsername: post?.author.username,
      previewedId: post?.author.id,
      currentId: currentUser.id,
      action: isFollowed ? 'unFollow' : 'follow',
      post: {
        title: post?.title,
        id: post?.id,
      },
    });
  };

  return (
    <Wrapper isLaptop={isLaptop} scrollY={scrollY}>
      <Header onClick={() => navigate(`/${post?.author.username}`)}>
        <Avatar src={post?.author?.picture?.url} />
        <Name>{post?.author.username}</Name>
      </Header>
      {post?.author.username === currentUser.username ? (
        <EditButton onClick={() => navigate('/customize')}>Edit details</EditButton>
      ) : (
        <LoadingController isLoading={isLoading}>
          <FollowButton onClick={handleFollow} isFollowed={isFollowed}>
            {isFollowed ? 'Following' : 'Follow'}
          </FollowButton>
        </LoadingController>
      )}
      <Bio>{post?.author.bio}</Bio>
      <Heading>Skills/languages</Heading>
      <Skills>{post?.author.skills}</Skills>
      <Heading>Location</Heading>
      <Location>{post?.author.Location}</Location>
      <Heading>Work</Heading>
      <Work>{post?.author.work}</Work>
      <Heading>Join date</Heading>
      <CreatedAt>{formatDate(post?.author.createdAt)}</CreatedAt>
    </Wrapper>
  );
};

const Header = tw.div`flex items-center gap-2`;

const Avatar = tw.img`cursor-pointer w-14 h-14 rounded-full`;

const Name = tw.h2`cursor-pointer hover:text-blue`;

const FollowButton = styled.button`
  ${tw`w-full bg-blue text-white border border-solid border-transparent rounded-md my-md py-2 px-4`}
  ${({ isFollowed }) =>
    isFollowed
      ? tw`text-blue border-blue bg-transparent`
      : tw`hover:(text-blue border-blue bg-transparent)`}
`;

const EditButton = tw(FollowButton)``;

const Bio = tw.p`text-dark-gray`;

const Heading = tw.h3`text-darker-gray mt-sm`;

const Skills = tw.p`text-dark-gray`;

const Location = tw.p`text-dark-gray`;

const Work = tw.p`text-dark-gray`;

const CreatedAt = tw.p`text-dark-gray`;

const Wrapper = tw.div`h-full w-1/3 py-6 px-4 bg-white lap:(w-full border-t border-light-gray)`;

export default AuthorDetails;
