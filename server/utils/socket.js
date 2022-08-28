let onlineUsers = [];

const addUser = (username, socketId) =>
  !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId });

const removeUser = socketId => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const findConnectedUser = username => onlineUsers.find(user => user.username === username);

const socketHandlers = io => {
  return io.on('connection', socket => {
    console.log(`Previous onlineUsers: ${onlineUsers}`);

    const handler = (sender, receiver) => {
      const receiverSocket = findConnectedUser(receiver.username);
      if (receiverSocket && sender.id != receiver.id) {
        io.to(receiverSocket.socketId).emit('notificationReceived');
      }
    };

    socket.on('join', username => {
      addUser(username, socket.id);
      console.log(`After add: ${onlineUsers}`);
    });

    socket.on('follow', ({ sender, receiver }) => {
      handler(sender, receiver);
    });

    socket.on('like', ({ sender, receiver }) => {
      handler(sender, receiver);
    });

    socket.on('comment', ({ sender, receiver }) => {
      handler(sender, receiver);
    });

    socket.on('post', ({ sender, receivers }) => {
      receivers.map(receiver => {
        handler(sender, receiver);
      });
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log(`After remove: ${onlineUsers}`);
    });
  });
};

module.exports = socketHandlers;
