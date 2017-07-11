const models = require('../models');
const session = require('express-session');
const sequelize = require('sequelize');


module.exports = {
  signup: function(req, res) {
    console.log(req.body);
    models.User.findAll().then(function(users) {
      res.render('signup', {users : users});
    });
  },
  home: function(req, res) {
    res.render('home', {});
  },
  login: function(req, res) {
    res.render('login', {});
  },
  signupButton: function(req, res) {
    //validate
    req.checkBody('userName', 'Please choose a username').notEmpty();
    req.checkBody('passWord', 'Please choose a password').notEmpty();
    let firstName = req.body.firstName;
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let confirmPass = req.body.confirmPass;

    models.User.create({
      username: userName,
      password: passWord,
      name: firstName
    }).then(function() {
      res.redirect('/login');
    })
  },
  loginButton: function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;


  }

}
