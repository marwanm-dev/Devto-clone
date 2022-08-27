import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../core/features/auth/authSlice';
import { io } from 'socket.io-client';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(io('http://localhost:5000'));
  const { username } = useSelector(selectCurrentUser);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', username);
    });
  }, []);

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
