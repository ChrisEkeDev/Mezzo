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
        songId: 24,
      },
      {//2
        playlistId: 1,
        songId: 30,
      },
      {//3
        playlistId: 1,
        songId: 14,
      },
      {//4
        playlistId: 2,
        songId: 18,
      },
      {//5
        playlistId: 2,
        songId: 38,
      },
      {//6
        playlistId: 2,
        songId: 45,
      },
      {//7
        playlistId: 3,
        songId: 22,
      },
      {//8
        playlistId: 3,
        songId: 1,
      },
      {//9
        playlistId: 3,
        songId: 37,
      },
      {//10
        playlistId: 4,
        songId: 50,
      },
      {//11
        playlistId: 4,
        songId: 13,
      },
      {//12
        playlistId: 4,
        songId: 25,
      },
      {//13
        playlistId: 5,
        songId: 11,
      },
      {//14
        playlistId: 5,
        songId: 6,
      },
      {//15
        playlistId: 5,
        songId: 40,
      },
      {//16
        playlistId: 6,
        songId: 30,
      },
      {//17
        playlistId: 6,
        songId: 33,
      },
      {//18
        playlistId: 6,
        songId: 17,
      },
      {//19
        playlistId: 7,
        songId: 50,
      },
      {//20
        playlistId: 7,
        songId: 46,
      },
      {//21
        playlistId: 7,
        songId: 3,
      },
      {//22
        playlistId: 8,
        songId: 20,
      },
      {//23
        playlistId: 8,
        songId: 32,
      },
      {//24
        playlistId: 8,
        songId: 15,
      },
      {//25
        playlistId: 9,
        songId: 38,
      },
      {//26
        playlistId: 9,
        songId: 9,
      },
      {//27
        playlistId: 9,
        songId: 29,
      },
      {//28
        playlistId: 10,
        songId: 20,
      },
      {//29
        playlistId: 10,
        songId: 39,
      },
      {//30
        playlistId: 10,
        songId: 17,
      },
      {//31
        playlistId: 11,
        songId: 11,
      },
      {//32
        playlistId: 11,
        songId: 20,
      },
      {//33
        playlistId: 11,
        songId: 25,
      },
      {//34
        playlistId: 12,
        songId: 48,
      },
      {//35
        playlistId: 12,
        songId: 4,
      },
      {//36
        playlistId: 12,
        songId: 5,
      },
      {//37
        playlistId: 13,
        songId: 29,
      },
      {//38
        playlistId: 13,
        songId: 33,
      },
      {//39
        playlistId: 13,
        songId: 41,
      },
      {//40
        playlistId: 14,
        songId: 13,
      },
      {//41
        playlistId: 14,
        songId: 21,
      },
      {//42
        playlistId: 14,
        songId: 48,
      },
      {//43
        playlistId: 15,
        songId: 2,
      },
      {//44
        playlistId: 15,
        songId: 13,
      },
      {//45
        playlistId: 15,
        songId: 37,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkDelete(options)
  }
};
