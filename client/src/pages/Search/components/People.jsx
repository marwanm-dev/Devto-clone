import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import FollowUser from '../../../common/FollowUser/FollowUser';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Placeholder from '../../../common/Placeholder';
import PostsList from '../../../common/PostsList';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { useGetUsersQuery } from '../../../core/features/users/usersApiSlice';
import { formatDate } from '../../../helpers/string';

const People = ({ value }) => {
  const { data: users, isLoading } = useGetUsersQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setFilteredUsers(
      users?.filter(
        user =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.username.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, users]);

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredUsers?.length > 0 ? (
        filteredUsers.map(user => (
          <User key={nanoid()} onClick={() => navigate(`/${user.username}`)}>
            <Header>
              <Avatar src={user.picture?.url} />
              <Username>{user.username}</Username>
            </Header>
            <Content>
              <Name>{user.name}</Name>
              <FlexEnd>
                <AdditionalInfo>
                  <Bio>{user.bio}</Bio>
                  <Flex>
                    <Work>{user.work}</Work>
                    <JoinDate>Joined {formatDate(user.createdAt)}</JoinDate>
                  </Flex>
                </AdditionalInfo>
                {user.username !== currentUser.username && (
                  <FollowUser
                    currentUser={currentUser}
                    previewedUser={user}
                    bottom={true}
                    preventPropagation={true}
                  />
                )}
              </FlexEnd>
            </Content>
          </User>
        ))
      ) : (
        <Placeholder />
      )}
    </Wrapper>
  );
};

const User = tw.div`rounded-md w-full overflow-hidden bg-white mb-2 shadow-sm hover:shadow px-4 py-md border border-transparent hover:border-blue cursor-pointer relative`;

const Header = tw.div`flex items-center gap-4`;

const Content = tw.div`ml-16 max-w-lg`;

const AdditionalInfo = tw.div`mt-sm`;

const Flex = tw.div`flex justify-between items-center mt-sm`;

const FlexEnd = tw(Flex)`items-end`;

const Avatar = tw.img`w-12 h-12 rounded-full`;

const Username = tw.p`cursor-pointer text-base`;

const Bio = tw.p`whitespace-pre-line`;

const Work = tw(Bio)``;

const JoinDate = tw.p``;

const Name = tw.h1`cursor-pointer hover:text-blue`;

const Wrapper = tw.div``;

export default People;
