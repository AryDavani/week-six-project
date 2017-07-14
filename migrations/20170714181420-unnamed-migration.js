'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Messages',
      'can_delete',
      {
        type: Sequelize.STRING(10)
      }
    )
  },
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Messages', 'can_delete');

  }
};
