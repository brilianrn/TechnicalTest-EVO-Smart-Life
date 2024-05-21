'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Carts', 'price', {
      type: Sequelize.FLOAT,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Carts', 'price', {
      type: Sequelize.INTEGER,
    })
  }
};
