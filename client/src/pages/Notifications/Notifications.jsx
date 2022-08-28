import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetAllNotificationsQuery } from '../../core/features/users/usersApiSlice';
import Notification from './components/Notification';

const Notifications = () => {
  const { id } = useSelector(selectCurrentUser);
  const { data: notifications, isLoading } = useGetAllNotificationsQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <RouteWrapper>
      <Heading>Notifications</Heading>
      <Wrapper>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          notifications.map(notification => (
            <Notification key={nanoid()} notification={notification} />
          ))}
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1`mb-lg`;

const Wrapper = tw.div`w-full flex flex-col gap-sm items-center`;

export default Notifications;
