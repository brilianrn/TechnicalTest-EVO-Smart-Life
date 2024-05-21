'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.FLOAT,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.INTEGER,
    })
  }
};
