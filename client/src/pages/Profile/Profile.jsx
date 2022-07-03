import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';
import { FaBirthdayCake, FaRegComment, FaHashtag } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { username } = useParams();

  return (
    <RouteWrapper>
      <Wrapper>
        <Card>
          <Avatar src={currentUser.picture} />
          {/* If the authenticated user is the previewed user */}
          {username === currentUser.username ? (
            <EditButton onClick={() => navigate('edit')}>Edit profile</EditButton>
          ) : (
            <FollowButton>Follow</FollowButton>
          )}
          <Username>{username}</Username>
          <Bio>{currentUser.bio || 'No bio'}</Bio>
          <Other>
            <LocationWrapper>
              <HiLocationMarker />
              <Location>{currentUser.location || 'Not determined'}</Location>
            </LocationWrapper>
            <JoinDateWrapper>
              <FaBirthdayCake />
              <JoinDate>Joined on {currentUser.joinDate || 'Not determined'}</JoinDate>
            </JoinDateWrapper>
          </Other>
          <Footer>
            <EducationWrapper>
              <Title>Education</Title>
              <Education>{currentUser.education || 'Not determined'}</Education>
            </EducationWrapper>
            <WorkWrapper>
              <Title>Work</Title>
              <Work>{currentUser.work || 'Not determined'}</Work>
            </WorkWrapper>
          </Footer>
        </Card>
        <AvailableForWrapper>
          <Heading>Available for</Heading>
          <AvailableFor>{currentUser.availableFor || 'Not determined'}</AvailableFor>
        </AvailableForWrapper>
        <Stats>
          <StatWrapper>
            <CgNotes />
            <Count>{currentUser?.posts?.length || 0}</Count>
            <Name>Posts published</Name>
          </StatWrapper>
          <StatWrapper>
            <FaRegComment />
            <Count>{currentUser?.comments?.length || 0}</Count>
            <Name>Comments written</Name>
          </StatWrapper>
          <StatWrapper>
            <FaHashtag />
            <Count>{currentUser?.followedTags?.length || 0}</Count>
            <Name>Tags followed</Name>
          </StatWrapper>
        </Stats>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`max-w-[1200px]`;

const Card = styled.div`
  box-shadow: 0 8px 5px -7px rgba(0, 0, 0, 0.2);
  ${tw`bg-white flex flex-col items-center gap-sm relative rounded-md`}
`;
const Avatar = tw.img`w-28 h-28 object-cover rounded-full border-4 border-black`;

const EditButton = tw.button`absolute top-lg right-lg text-white bg-blue rounded-md py-2 px-4`;

const FollowButton = tw(EditButton)``;

const Username = tw.h2``;

const Bio = tw.p`text-lg max-w-2xl text-center`;

const Other = tw.div`flex gap-lg`;

const LocationWrapper = tw.div`flex gap-2 text-gray`;

const Location = tw.div``;

const JoinDateWrapper = tw.div`flex gap-2 text-gray`;

const JoinDate = tw.div``;

const Footer = tw.div`w-full text-center border-t border-light-gray py-md flex items-center justify-evenly`;

const EducationWrapper = tw.div``;

const Education = tw.div``;

const WorkWrapper = tw.div``;

const Work = tw.div``;

const Title = tw.p`text-gray`;

const Stats = tw(Card)`w-80 items-start p-5 mt-sm`;

const StatWrapper = tw.div`flex items-center gap-2`;

const Count = tw.p``;

const Name = tw.p``;

const AvailableForWrapper = tw(Stats)``;

const Heading = tw.h4`w-full pb-sm border-b border-light-gray`;

const AvailableFor = tw.p`pb-sm`;

export default Profile;
