'use strict';

const read = require('read')

function CLI() {
}

module.exports = CLI;

CLI.prototype.loginTo = function(api) {
  return this.login().then( ({username, password}) => {
    return api.auth( username, password ).then( user => {
      api.username = username;
      api.password = password;
      return user;
    });
  });
};

CLI.prototype.login = function() {
  return new Promise((resolve)=> {
    read({ prompt: 'username: ' }, (error, username)=> {
      read({ prompt: 'password: ', silent: true, replace: '*' }, (error, password)=> {
        resolve({username, password});
      });
    });
  });
};
