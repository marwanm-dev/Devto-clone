import { useEffect } from 'react';
import { CgNotes } from 'react-icons/cg';
import { FaBirthdayCake, FaHashtag, FaRegComment } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import NotFound from '../../common/NotFound/NotFound';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useGetUserQuery,
  useHandleUserFollowMutation,
} from '../../core/features/users/usersApiSlice';
import { formatDate } from '../../helpers/string';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { username } = useParams();
  const { data: previewedUser } = useGetUserQuery(username, { refetchOnMountOrArgChange: true });
  const [handleUserFollow] = useHandleUserFollowMutation();
  const isFollowed = previewedUser?.followers?.includes(currentUser.id);

  const handleFollowFunc = async () => {
    await handleUserFollow({
      previewedId: previewedUser._id,
      action: isFollowed ? 'unFollow' : 'follow',
      currentId: currentUser.id,
      previewedUsername: previewedUser.username,
    });
  };

  return (
    <RouteWrapper>
      {previewedUser ? (
        <Wrapper>
          <Card>
            <Avatar src={previewedUser.picture.url} />
            {previewedUser.username === currentUser.username ? (
              <EditButton onClick={() => navigate('/customize')}>Edit profile</EditButton>
            ) : (
              <FollowButton onClick={handleFollowFunc} isFollowed={isFollowed}>
                {isFollowed ? 'Following' : 'Follow'}
              </FollowButton>
            )}
            <Name>{previewedUser.name}</Name>
            <Bio>{previewedUser.bio || 'No bio'}</Bio>
            <Other>
              <LocationWrapper>
                <HiLocationMarker />
                <Location>{previewedUser.location || 'Not determined'}</Location>
              </LocationWrapper>
              <CreatedAtWrapper>
                <FaBirthdayCake />
                <CreatedAt>Joined on {formatDate(previewedUser.createdAt)}</CreatedAt>
              </CreatedAtWrapper>
            </Other>
            <Footer>
              <EducationWrapper>
                <Title>Education</Title>
                <Education>{previewedUser.education || 'Not determined'}</Education>
              </EducationWrapper>
              <WorkWrapper>
                <Title>Work</Title>
                <Work>{previewedUser.work || 'Not determined'}</Work>
              </WorkWrapper>
            </Footer>
          </Card>
          <AvailableForWrapper>
            <Heading>Available for</Heading>
            <AvailableFor>{previewedUser.availableFor || 'Not determined'}</AvailableFor>
          </AvailableForWrapper>
          <Stats>
            <StatWrapper>
              <CgNotes />
              <Count>{previewedUser.posts?.length || 0}</Count>
              <StatName>Posts published</StatName>
            </StatWrapper>
            <StatWrapper>
              <FaRegComment />
              <Count>{previewedUser.comments?.length || 0}</Count>
              <StatName>Comments written</StatName>
            </StatWrapper>
            <StatWrapper>
              <FaHashtag />
              <Count>{previewedUser.followedTags?.length || 0}</Count>
              <StatName>Tags followed</StatName>
            </StatWrapper>
          </Stats>
        </Wrapper>
      ) : (
        <NotFound />
      )}
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

const FollowButton = styled.button`
  ${tw`bg-blue text-white border border-solid border-transparent absolute top-lg right-lg rounded-md py-2 px-4`}
  ${({ isFollowed }) => isFollowed && tw`text-blue border-blue bg-white`}
`;

const Name = tw.h2``;

const Bio = tw.p`text-lg max-w-2xl text-center`;

const Other = tw.div`flex gap-lg`;

const LocationWrapper = tw.div`flex gap-2 text-gray`;

const Location = tw.div``;

const CreatedAtWrapper = tw.div`flex gap-2 text-gray`;

const CreatedAt = tw.div``;

const Footer = tw.div`w-full text-center border-t border-light-gray py-md flex items-center justify-evenly`;

const EducationWrapper = tw.div``;

const Education = tw.div``;

const WorkWrapper = tw.div``;

const Work = tw.div``;

const Title = tw.p`text-gray`;

const Stats = tw(Card)`w-80 items-start p-5 mt-sm`;

const StatWrapper = tw.div`flex items-center gap-2`;

const Count = tw.p``;

const StatName = tw.p``;

const AvailableForWrapper = tw(Stats)``;

const Heading = tw.h4`w-full pb-sm border-b border-light-gray`;

const AvailableFor = tw.p`pb-sm`;

export default Profile;
