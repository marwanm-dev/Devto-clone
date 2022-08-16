import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { formatDate } from '../../helpers/string';

const AuthorDetails = ({ isLaptop, author }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Wrapper isLaptop={isLaptop} scrollY={scrollY}>
      <Header onClick={() => navigate(`/${author.username}`)}>
        <Avatar src={author?.picture?.url} />
        <Name>{author.username}</Name>
      </Header>
      {author.username === currentUser.username ? (
        <EditButton onClick={() => navigate('/customize')}>Edit details</EditButton>
      ) : (
        <FollowButton>Follow</FollowButton>
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

const Avatar = tw.img`w-12 rounded-full`;

const Name = tw.h2`cursor-pointer hover:text-blue`;

const FollowButton = tw.button`w-full py-2 bg-blue text-white text-center rounded-md my-md`;

const EditButton = tw(FollowButton)``;

const Bio = tw.p`text-dark-gray`;

const Heading = tw.h3`text-darker-gray mt-sm`;

const Skills = tw.p`text-dark-gray`;

const Location = tw.p`text-dark-gray`;

const Work = tw.p`text-dark-gray`;

const CreatedAt = tw.p`text-dark-gray`;

const Wrapper = tw.div`h-full w-1/3 py-6 px-4 bg-white lap:(w-full border-t border-light-gray)`;

export default AuthorDetails;
