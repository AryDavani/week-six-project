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
    // console.log('session id is ' + req.session.userId);
    let canDelete = '';
    models.Message.findAll({ include: [{
      model: models.User,
      as: 'users'
    }], order: [['createdAt', 'DESC']]
  }).then(function(results) {
    // console.log(results);
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].user_id);
      if (results[i].user_id === req.session.userId) {
        results[i].can_delete = 'true';
        results[i].save().then(function(result) {
          // console.log(result);
        });
      } else {
        results[i].can_delete = '';
        results[i].save().then(function(result) {
          // console.log(result);
        });
      }
    }
    res.render('home', {results: results, isItYou: canDelete });
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
  },

  postButton: function(req, res) {
    models.Message.create({
      text: req.body.textarea,
      user_id: req.session.userId
    }).then(function(message) {
      res.redirect('/');
    });
  },

  likeButton: function(req, res) {
    res.redirect('/');
  },

  deleteButton: function(req, res) {
    console.log("DELETE BUTTON PRESSED");
    let messageId = req.body.deleteId;
    models.Message.destroy({
      where: {
        id: messageId
      }
    }).then(function(message) {
      res.redirect('/');
    });
  }
}
