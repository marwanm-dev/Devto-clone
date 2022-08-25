import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetAllNotificationsQuery } from '../../core/features/users/usersApiSlice';

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
      {isLoading && <LoadingSpinner />}
      {!isLoading && <Wrapper></Wrapper>}
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Notifications;
