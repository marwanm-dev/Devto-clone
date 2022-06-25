import { Link } from 'react-router-dom';
import tw, { styled, theme } from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const AuthorDetails = () => {
  const navigate = useNavigate();

  return (
    <Wrapper scrollY={scrollY}>
      <Header onClick={() => navigate('/users/username')}>
        <Avatar src='../../../assets/images/Screenshot_2021-02-21-20-01-06-24.jpg' />
        <Name>marodevv</Name>
      </Header>
      <FollowButton>Follow</FollowButton>
      <Bio>
        Typical bacon scholar. Subtly charming food junkie. Extreme social media guru. Coffee Maven
      </Bio>
      <Heading>Skills/languages</Heading>
      <Skills>React, Node, GraphQL</Skills>
      <Heading>Location</Heading>
      <Location>Egypt, Cairo</Location>
      <Heading>Work</Heading>
      <Work>Fullstack developer</Work>
    </Wrapper>
  );
};

const Header = tw.div`flex items-center gap-2`;

const Avatar = tw.img`w-12 rounded-full`;

const Name = tw.h2`cursor-pointer hover:text-blue`;

const FollowButton = tw.button`w-full py-2 bg-blue text-white text-center rounded-md my-md`;

const Bio = tw.p`text-dark-gray`;

const Heading = tw.h3`text-darker-gray mt-sm`;

const Skills = tw.p`text-dark-gray`;

const Location = tw.p`text-dark-gray`;

const Work = tw.p`text-dark-gray`;

const Wrapper = tw.div`max-w-xs h-full py-6 px-4 bg-white lap:(max-w-full border-t border-light-gray)`;

export default AuthorDetails;
