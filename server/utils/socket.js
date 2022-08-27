let onlineUsers = [];

const addUser = (username, socketId) =>
  !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId });

const removeUser = socketId => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const findConnectedUser = userId => onlineUsers.find(user => user.userId === userId);

const socketHandlers = io => {
  return io.on('connection', socket => {
    console.log(`new connected socketId: ${socket.id}`);
    console.log(`Previous onlineUsers: ${onlineUsers}`);

    socket.on('join', username => {
      addUser(username, socket.id);
      console.log(`After add: ${onlineUsers}`);
    });

    socket.on('follow', ({ sender, receiver }) => {
      const receiverSocket = findConnectedUser(receiver._id);
      socket.emit('notificationReceived');
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log(`After remove: ${onlineUsers}`);
    });
  });
};

module.exports = socketHandlers;
