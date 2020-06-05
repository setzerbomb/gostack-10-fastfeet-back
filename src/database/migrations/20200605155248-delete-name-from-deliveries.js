'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('deliveries', 'name');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliveries', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
