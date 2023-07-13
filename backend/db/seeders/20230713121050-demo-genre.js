'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Genres';
    await queryInterface.bulkInsert(options, [
      {//1
        name: "R&B"
      },
      {//2
        name: "Hip Hop"
      },
      {//3
        name: "Soul"
      },
      {//4
        name: "Country"
      },
      {//5
        name: "Electronic"
      },
      {//6
        name: "Classical"
      },
      {//7
        name: "Rock"
      },
      {//8
        name: "Alternative"
      },
      {//9
        name: "Pop"
      },
      {//10
        name: "Jazz"
      },
      {//11
        name: "Funk"
      },
      {//12
        name: "Indie Folk"
      },
      {//13
        name: "Gospel"
      },
      {//14
        name: "Ambient"
      },
      {//15
        name: "Electronic"
      },
      {//16
        name: "Children's"
      },
      {//17
        name: "Contemporary"
      },
      {//18
        name: "Reggae"
      },
      {//19
        name: "Blues"
      },
      {//20
        name: "Latin"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Genres';
    await queryInterface.bulkDelete(options)
  }
};
