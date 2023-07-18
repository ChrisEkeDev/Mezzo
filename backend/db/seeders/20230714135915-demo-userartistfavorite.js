'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'UserArtistFavorites';
    await queryInterface.bulkInsert(options, [
      {//1
        userId: 2,
        artistId: 1
      },
      {//2
        userId: 2,
        artistId: 4
      },
      {//3
        userId: 2,
        artistId: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserArtistFavorites';
    await queryInterface.bulkDelete(options)
  }
};
