'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Carts', 'totalPrice', {
      type: Sequelize.FLOAT,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Carts', 'totalPrice', {
      type: Sequelize.INTEGER,
    })
  }
};
