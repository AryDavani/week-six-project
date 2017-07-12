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
    res.render('signup', {});
  },

  home: function(req, res) {
    models.Message.findAll().then(function(results) {
      console.log(results);
      res.render('home', { results });
    });
  },

  login: function(req, res) {
    res.render('login', {});
  },

  logoutButton: function(req, res) {
    req.session.destroy();
    res.redirect('/user/login');
  },

  signupButton: function(req, res, next) {
    req.checkBody('password2', 'Passwords dont match').equals(req.body.passWord);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        let error = result.toArray();
        res.render('signup', { error });
      } else {
        models.User.create({
          username: req.body.userName,
          password: req.body.passWord,
          name: req.body.firstName
        }).then(function() {
          res.redirect('/user/login');
        });
      }
    });

  },

  loginButton: function(req, res) {
    models.User.findOne({ where: { username: req.body.userName, password: req.body.passWord }}).then(function(result) {
      if (result) {
        req.session.UserId = result.id;
        req.session.UserName = result.name;
        res.redirect('/');
      } else {
        let error = ['wrong username/password'];
        return res.render('login', { error });
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
