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

app.use(express.static(path.join(__dirname, "public")));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(session({
  secret: 'top secret',
  resave: false,
  saveUninitialized: false
}));

router(app);

app.listen(3000);
