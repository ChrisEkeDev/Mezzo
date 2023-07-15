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
        userId: 1,
        songId: 5
      },
      {//2
        userId: 1,
        songId: 33
      },
      {//3
        userId: 1,
        songId: 44
      },
      {//4
        userId: 1,
        songId: 23
      },
      {//5
        userId: 1,
        songId: 50
      },
      {//6
        userId: 2,
        songId: 6
      },
      {//7
        userId: 2,
        songId: 13
      },
      {//8
        userId: 2,
        songId: 27
      },
      {//9
        userId: 2,
        songId: 35
      },
      {//10
        userId: 2,
        songId: 45
      },
      {//11
        userId: 3,
        songId: 27
      },
      {//12
        userId: 3,
        songId: 15
      },
      {//13
        userId: 3,
        songId: 41
      },
      {//14
        userId: 3,
        songId: 38
      },
      {//15
        userId: 3,
        songId: 29
      },
      {//16
        userId: 4,
        songId: 6
      },
      {//17
        userId: 4,
        songId: 14
      },
      {//18
        userId: 4,
        songId: 19
      },
      {//19
        userId: 4,
        songId: 43
      },
      {//20
        userId: 4,
        songId: 24
      },
      {//21
        userId: 5,
        songId: 8
      },
      {//22
        userId: 5,
        songId: 15
      },
      {//23
        userId: 5,
        songId: 13
      },
      {//24
        userId: 5,
        songId: 27
      },
      {//25
        userId: 5,
        songId: 33
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserSongFavorites';
    await queryInterface.bulkDelete(options)
  }
};
