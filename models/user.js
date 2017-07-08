'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING(20),
    password: DataTypes.STRING(20)
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Message, {as: 'texts', foreignKey: 'userId'});

};
  return User;
};
