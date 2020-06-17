const express = require('express');
const usersService = require('./usersService');
const authService = require('../../services/authService');
const helpers = require('../../helpers');
const parser = express.json();
const usersPath = express.Router();

usersPath
  .route('/register')
  .post(parser, async (req, res, next) => {
    try {
      const knex = req.app.get('db');
      const { body } = req;
      helpers.validInputs(body);
    }

    catch (error) {
      next(error);
    }
    
  });

module.exports = usersPath;