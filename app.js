'use strict';

const models = require('./models');
const express = require('express');
const mustacheExpress = require('mustache-express');
const sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const parseurl = require('parseurl');
const router = require('./routes/router');
const session = require('express-session');

const app = express();

// set views
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

// set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'top secret', resave: false, saveUninitialized: false }));

app.use(function(req, res, next){
  let pathname = parseurl(req).pathname;
  let sess = req.session;

  if (!sess.UserId && (!pathname.includes('/user'))){
    res.redirect('/user/login');
  } else {
    next();
  }
});

router(app);

app.listen(3000);
