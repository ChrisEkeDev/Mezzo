'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'UserSongFavorites';
    await queryInterface.bulkInsert(options, [
      {//1
        userId: 2,
        songId: 24
      },
      {//2
        userId: 2,
        songId: 18
      },
      {//3
        userId: 2,
        songId: 5
      },
      {//4
        userId: 2,
        songId: 11
      },
      {//5
        userId: 2,
        songId: 22
      },
      {//6
        userId: 2,
        songId: 2
      },
      {//7
        userId: 2,
        songId: 9
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserSongFavorites';
    await queryInterface.bulkDelete(options)
  }
};
