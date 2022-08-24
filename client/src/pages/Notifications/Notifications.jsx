import { io } from 'socket.io-client';
import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Notifications = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Notifications page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Notifications;
