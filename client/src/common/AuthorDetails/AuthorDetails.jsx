import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import SocketContext from '../../context/SocketContext';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useHandleUserFollowMutation } from '../../core/features/users/usersApiSlice';
import { formatDate } from '../../helpers/string';
import LoadingController from '../LoadingController/LoadingController';
import ShowMore from '../ShowMore/ShowMore';

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
        <Name>{post?.author.name}</Name>
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
      {post?.author.bio && (
        <Section>
          <Heading>Bio</Heading>
          <Content>{post.author.bio}</Content>
        </Section>
      )}
      {post?.author.skills && (
        <Section>
          <Heading>Skills/languages</Heading>
          <Content>
            <ShowMore text={post.author?.skills || 'Not determined yet'} maxChars={300} />
          </Content>
        </Section>
      )}
      {post?.author.location && (
        <Section>
          <Heading>Location</Heading>
          <Content>{post.author.location}</Content>
        </Section>
      )}
      {post?.author.createdAt && (
        <Section>
          <Heading>Join date</Heading>
          <Content>{formatDate(post.author.createdAt)}</Content>
        </Section>
      )}
    </Wrapper>
  );
};

const Header = tw.div`flex items-center gap-sm`;

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

const Section = tw.div``;

const Content = tw.p`text-dark-gray whitespace-pre-line`;

const Heading = tw.p`text-darker-gray mt-sm mb-2 uppercase font-bold`;

const Wrapper = tw.div`max-w-sm min-w-[250px] lap:(max-w-full) h-full py-6 px-4 bg-white lap:(w-full border-t border-light-gray) rounded-md shadow`;

export default AuthorDetails;
