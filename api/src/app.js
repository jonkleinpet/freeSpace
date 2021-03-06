require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const usersRoute = require('./routes/users/usersRoute');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

// Middleware
app.use(morgan(morganOption, { skip: () => NODE_ENV === 'test' }));
app.use(helmet());
app.use(cors());

// Routes
app.use('/api', usersRoute);

// Basic error handling
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
