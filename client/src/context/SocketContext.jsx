import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { selectCurrentUser } from '../core/features/auth/authSlice';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(io(process.env.BASE_URL));
  const { username } = useSelector(selectCurrentUser);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', username);
    });
  }, []);

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
