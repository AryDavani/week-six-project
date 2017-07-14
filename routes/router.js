const express = require('express');
const app = express();
const Controller = require('../controllers/controllers');


module.exports = function(app) {

  app.get('/', Controller.backslash);
  app.get('/user/signup', Controller.signup);
  app.get('/user/login', Controller.login);
  app.get('/gabble/:username', Controller.home);

  app.post('/signup', Controller.signupButton);
  app.post('/user/login', Controller.loginButton);
  app.post('/post', Controller.postButton);
  app.post('/logout', Controller.logoutButton);
  app.post('/deletepost', Controller.deleteButton);
}
