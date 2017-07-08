const models = require('./models');
const express = require('express');
const mustacheExpress = require('mustache-express');
const sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator');
const expressValidator = require('express-validator');
const parseurl = require('parseurl');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('home', {});
});

app.get('/signup', function(req, res) {
  models.User.findAll().then(function(users) {
    console.log(users);
    res.render('signup', {users : users});
  });
});

app.get('/login', function(req, res) {
  res.render('login', {});
});

app.listen(3000);
