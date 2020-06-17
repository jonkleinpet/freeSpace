require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret123!'
};
