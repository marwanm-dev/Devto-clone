import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useHandleUserFollowMutation } from '../../core/features/users/usersApiSlice';
import { formatDate } from '../../helpers/string';

const AuthorDetails = ({ isLaptop, post }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [handleUserFollow] = useHandleUserFollowMutation();
  const { _id, title, author } = post;
  const isFollowed = author?.followers?.includes(currentUser.id);

  const handleFollowFunc = async () => {
    await handleUserFollow({
      previewedId: author._id,
      action: isFollowed ? 'unFollow' : 'follow',
      currentId: currentUser.id,
      previewedUsername: author.username,
      post: {
        title,
        _id,
      },
    });
  };

  return (
    <Wrapper isLaptop={isLaptop} scrollY={scrollY}>
      <Header onClick={() => navigate(`/${author.username}`)}>
        <Avatar src={author?.picture?.url} />
        <Name>{author.username}</Name>
      </Header>
      {author.username === currentUser.username ? (
        <EditButton onClick={() => navigate('/customize')}>Edit details</EditButton>
      ) : (
        <FollowButton onClick={handleFollowFunc} isFollowed={isFollowed}>
          {isFollowed ? 'Following' : 'Follow'}
        </FollowButton>
      )}
      <Bio>{author.bio}</Bio>
      <Heading>Skills/languages</Heading>
      <Skills>{author.skills}</Skills>
      <Heading>Location</Heading>
      <Location>{author.Location}</Location>
      <Heading>Work</Heading>
      <Work>{author.work}</Work>
      <Heading>Join date</Heading>
      <CreatedAt>{formatDate(author.createdAt)}</CreatedAt>
    </Wrapper>
  );
};

const Header = tw.div`flex items-center gap-2`;

const Avatar = tw.img`w-14 h-14 rounded-full`;

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
