'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemData = require('../data/items.json');

    itemData.map(item => {
      item.createdAt = new Date();
      item.updatedAt = new Date();
    })

    return queryInterface.bulkInsert('Items', itemData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
