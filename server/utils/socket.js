const socketHandlers = io => {
  return io.on('connection', socket => {
    console.log('user connected', socket.id);
    socket.emit('event-1');
  });
};

module.exports = socketHandlers;
