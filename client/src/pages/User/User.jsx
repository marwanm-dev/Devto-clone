import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import axios from '../../api/axios';
import RouteWrapper from '../../common/RouteWrapper';

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsersList = async () => {
      const response = await axios.get('/users', { withCredentials: true });
      const users = await response.data;

      setUsersList(users);
    };

    fetchUsersList();
  }, []);

  return (
    <RouteWrapper>
      <Wrapper>
        <h1>UsersList</h1>
        {usersList.map(user => (
          <UserContainer>{user}</UserContainer>
        ))}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

const UserContainer = tw.div`w-full bg-black text-white px-4 py-6 text-center`;

export default UsersList;
