'use strict';

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});

  Message.associate = function(models) {
    Message.belongsTo(models.User, {as: 'users', foreignKey: 'user_id'});
};
  return Message;
};
