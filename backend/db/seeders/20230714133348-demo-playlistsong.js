'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkInsert(options, [
      {//1
        playlistId: 1,
        songId: 7,
      },
      {//2
        playlistId: 1,
        songId: 17,
      },
      {//3
        playlistId: 1,
        songId: 25,
      },
      {//4
        playlistId: 2,
        songId: 8,
      },
      {//5
        playlistId: 2,
        songId: 13,
      },
      {//6
        playlistId: 2,
        songId: 23,
      },
      {//7
        playlistId: 3,
        songId: 19,
      },
      {//8
        playlistId: 3,
        songId: 22,
      },
      {//9
        playlistId: 3,
        songId: 18,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkDelete(options)
  }
};
