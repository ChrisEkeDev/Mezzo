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
        userId: 1,
        artistId: 3
      },
      {//2
        userId: 1,
        artistId: 6
      },
      {//3
        userId: 2,
        artistId: 2
      },
      {//4
        userId: 2,
        artistId: 1
      },
      {//5
        userId: 3,
        artistId: 4
      },
      {//6
        userId: 3,
        artistId: 9
      },
      {//7
        userId: 4,
        artistId: 10
      },
      {//8
        userId: 4,
        artistId: 7
      },
      {//1
        userId: 5,
        artistId: 8
      },
      {//2
        userId: 5,
        artistId: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserArtistFavorites';
    await queryInterface.bulkDelete(options)
  }
};
