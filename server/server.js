require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const corsOptions = require('./config/corsOptions');
const dbConn = require('./config/dbConn');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const { Server } = require('socket.io');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
(async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI, dbConn);
  } catch (err) {
    console.error(err);
  }
})();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));
app.use('/posts', require('./routes/posts'));

// Verification required
app.use(verifyJWT);
app.use('/users', require('./routes/users'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB, The Server Running on http://localhost:${PORT}`);

  // io "on" events
  // const io = new Server(PORT, {
  //   corsOptions,
  // });
  app.listen(PORT);
});
