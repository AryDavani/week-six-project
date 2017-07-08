'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserMsg', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Messages',
          key: 'id'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserMsg');
  }
};
