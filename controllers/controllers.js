const models = require('../models');
const session = require('express-session');
const sequelize = require('sequelize');

// middleware checks errors
// signup button creates new user in db
// login button checks if username/password is in db and stores session id
// post button creates a post/message in the db tied to a user with foreign key
// like button posts on association table a connection of users-to-messages


module.exports = {

  signup: function(req, res) {
    res.render('signup');
  },

  home: function(req, res) {
    models.Message.findAll().then(function(results) {
      console.log(results);
      res.render('home', { results: results });
    });
  },

  login: function(req, res) {
    res.render('login');
  },

  logoutButton: function(req, res) {
    req.session.destroy();
    res.redirect('/login');
  },

  signupButton: function(req, res, next) {
    
    models.User.create({
      username: req.body.userName,
      password: req.body.passWord,
      name: req.body.firstName
    }).then(function() {
      res.redirect('/login');
    });
  },

  loginButton: function(req, res) {
    let error = '';
    models.User.findOne({ where: { username: req.body.userName, password: req.body.passWord }}).then(function(result) {
      if (result) {
        req.session.UserId = result.id;
        res.redirect('/');
      } else {
        return res.redirect('/login');
      };
    });
  },

  messageButton: function(req, res) {
    models.Message.create({
      text: req.body.textarea,
      user_id: req.session.userId
    }).then(function() {
      res.redirect('/');
    });
  }
}
