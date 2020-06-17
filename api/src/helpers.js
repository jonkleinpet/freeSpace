const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const helpers = {
  validInputs(body) {
    
    let reply = {
      inputError: null,
      message: ''
    };

    for (const key of ['username', 'password']) {
      if (!body[key]) {
        reply.inputError = true;
        reply.message = `missing ${key} in request body`;
      }
    }
    return reply;
  },

  validPassword(password) {
    if (password.length < 8)
      return 'Password must be at least 8 characters';
    
    if (password.length > 72)
      return 'Password can not be longer than 72 characters';
    
    if (password.startsWith(' ') || password.endsWith(' '))
      return 'Password must not start or end with empty spaces';
    
    if (!regex.test(password))
      return 'Password must contain one upper case, lower case, number and special character';
  }
};

module.exports = helpers;