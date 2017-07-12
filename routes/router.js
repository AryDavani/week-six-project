const express = require('express');
const app = express();
const Controller = require('../controllers/controllers');


module.exports = function(app) {

  app.get('/', Controller.home);
  app.get('/user/signup', Controller.signup);
  app.get('/user/login', Controller.login);

  app.post('/signup', Controller.signupButton);
  app.post('/login', Controller.loginButton);
  app.post('/message', Controller.messageButton);
  app.post('/logout', Controller.logoutButton);

}
