const express = require('express');
const app = express();
const Controller = require('../controllers/controllers');


module.exports = function(app) {

  app.get('/', Controller.home);
  app.get('/signup', Controller.signup);
  app.get('/login', Controller.login);
  app.post('/signupButton', Controller.signupButton);
  app.post('/loginButton', Controller.loginButton);
}
