const bcrypt = require('bcryptjs');

const usersService = {
  registerUser(db, user) {
    return db
      .insert(user)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },

  checkUsername(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  getUser(db, username) {
    return db
      .select('*')
      .from('users')
      .where({ username })
      .then(user => user[0]);
  }
};

module.exports = usersService;