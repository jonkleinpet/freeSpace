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
      const { inputError, message } = await helpers.validInputs(body);

      if (inputError) {
        return res.send({ message });
      }

      const passMessage = await helpers.validPassword(body.password);
      if (passMessage) {
        return res.send({ passMessage });
      }

      const hashPass = await usersService.hashPassword(body.password);
      const user = {
        username: body.username,
        password: hashPass
      };

      const newUser = await usersService.registerUser(knex, user);
      const sub = newUser.username;
      const payload = {
        id: newUser.id
      };

      return res.send({ authToken: authService.createJwt(sub, payload) });
    }

    catch (error) {
      next(error);
    }
  });

usersPath
  .route('/login')
  .post(parser, async (req, res, next) => {
    try {
      const knex = req.app.get('db');
      const { body } = req;
      const { inputError, message } = await helpers.validInputs(body);

      if (inputError) {
        return res.send({ message });
      }

      const existingUser = await usersService.checkUsername(knex, body.username);
      
      if (!existingUser) {
        res.send({ message: 'Incorrect username or password' });
      }
      const user = await usersService.getUser(knex, body.username);
      const validPassword = authService.comparePasswords(body.password, user.password);
      
      if (validPassword) {
        const sub = user.username;
        const payload = {
          id: user.id
        };

        return res.send({ authToken: authService.createJwt(sub, payload) });
      }

      return res.send({ message: 'incorrect username or password' });
    }

    catch (error) {
      next(error);
    }
  });

module.exports = usersPath;