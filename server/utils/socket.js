let onlineUsers = [];

const addUser = (username, socketId) =>
  !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId });

const removeUser = socketId => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const findConnectedUser = username => onlineUsers.find(user => user.username === username);

const socketHandlers = io => {
  return io.on('connection', socket => {
    const handler = (sender, receiver, { type, reactionType, post }) => {
      const receiverSocket = findConnectedUser(receiver.username);
      if (receiverSocket && sender.id != receiver.id) {
        io.to(receiverSocket.socketId).emit('notificationReceived', {
          sender,
          receiverUsername: receiver.username,
          type,
          reactionType,
          post,
        });
      }
    };

    socket.on('join', username => {
      addUser(username, socket.id);
    });

    socket.on('follow', ({ sender, receiver }) => {
      handler(sender, receiver, { type: 'follow' });
    });

    socket.on('react', ({ sender, receiver, reactionType, post }) => {
      handler(sender, receiver, { type: 'react', reactionType, post });
    });

    socket.on('comment', ({ sender, receiver, post }) => {
      handler(sender, receiver, { type: 'comment', post });
    });

    socket.on('post', ({ sender, receivers, post }) => {
      receivers.map(receiver => {
        handler(sender, receiver, { type: 'post', post });
      });
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
    });
  });
};

module.exports = socketHandlers;
