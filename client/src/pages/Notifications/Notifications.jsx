import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import Placeholder from '../../common/Placeholder';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetNotificationsQuery } from '../../core/features/users/usersApiSlice';
import Notification from './components/Notification';

const Notifications = () => {
  const { id } = useSelector(selectCurrentUser);
  const { data: notifications, isLoading } = useGetNotificationsQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <RouteWrapper>
      <Heading>Notifications</Heading>
      <Wrapper>
        {isLoading ? (
          <LoadingSpinner />
        ) : notifications?.length ? (
          notifications.map(notification => (
            <Notification key={nanoid()} notification={notification} />
          ))
        ) : (
          <Placeholder />
        )}
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1`mb-lg`;

const Wrapper = tw.div`w-full flex flex-col gap-sm items-center`;

export default Notifications;
