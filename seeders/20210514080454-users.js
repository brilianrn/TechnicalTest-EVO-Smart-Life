'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = require('../data/users.json');
    const { hashPass } = require('../helpers/hashPass');

    userData.map(user => {
      user.password = hashPass(user.password)
      user.createdAt = new Date();
      user.updatedAt = new Date();
    })

    return queryInterface.bulkInsert('Users', userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
