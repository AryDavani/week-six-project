const models = require('../models');
const session = require('express-session');
const sequelize = require('sequelize');



module.exports = {

  backslash: function(req, res) {
    models.User.findOne({
      where: {
        id: req.session.userId
      }
    }).then(function(result) {
      res.redirect('/gabble/' + result.username);
    });
  },

  signup: function(req, res) {
    res.render('signup', {});
  },

  home: function(req, res) {
    console.log('HOMEPAGE');
    models.Message.findAll({ include: [{
      model: models.User,
      as: 'users'
    }]}).then(function(results) {
    console.log(results);
    res.render('home', {results});
    });
  },

  login: function(req, res) {
    res.render('login', {});
  },

  logoutButton: function(req, res) {
    req.session.destroy();
    res.redirect('/user/login');
  },

  signupButton: function(req, res) {
    // req.checkBody('password2', 'Passwords dont match').equals(req.body.passWord);
    //
    // req.getValidationResult().then(function(result) {
    //   if (result.isEmpty()) {
        models.User.create({
          username: req.body.userName,
          password: req.body.passWord,
          name: req.body.firstName
        }).then(function() {
          res.redirect('/user/login');
        });

  },

  loginButton: function(req, res) {
    if(req.body.userName && req.body.passWord){
      models.User.findOne({
        where: {
          username: req.body.userName, password: req.body.passWord
        }
      }).then(function(user){
        console.log("IS THE SESSION GETTING SET?");
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect('/gabble/' + user.username);
      });
    } else {
      console.log('please provide credentials');
      res.redirect('/user/login');
    }
    // models.User.findOne({ where: { username: req.body.userName, password: req.body.passWord }}).then(function(result) {
    //   if (result) {
    //     let userPath = '/' + result.username;
    //     req.session.userId = result.id;
    //     req.session.name = result.name;
    //     console.log('session id', req.session.userId);
    //     res.redirect('detail/' + userPath);
    //   } else {
    //     console.log('error');
    //     let error = ['wrong username/password'];
    //     // res.redirect('/user/login');
    //   }
    // });
  },

  postButton: function(req, res) {
    models.Message.create({
      text: req.body.textarea,
      user_id: req.session.userId
    }).then(function() {
      res.redirect('/');
    });
  },

  likeButton: function(req, res) {

  }
}
