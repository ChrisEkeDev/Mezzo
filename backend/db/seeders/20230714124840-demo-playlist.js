'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkInsert(options, [
      {//1
        name: "Rest & Relaxation",
        userId: 1
      },
      {//2
        name: "Go Crazy",
        userId: 1
      },
      {//3
        name: "Workout Mix",
        userId: 1
      },
      {//4
        name: "Swanky",
        userId: 2
      },
      {//5
        name: "EDMs",
        userId: 2
      },
      {//6
        name: "Spaced Out",
        userId: 2
      },
      {//7
        name: "Chilling",
        userId: 3
      },
      {//8
        name: "The Classics",
        userId: 3
      },
      {//9
        name: "Mind Bending",
        userId: 3
      },
      {//10
        name: "Rock and Roll",
        userId: 4
      },
      {//11
        name: "Loud and Proud",
        userId: 4
      },
      {//12
        name: "Deep Thoughts",
        userId: 4
      },
      {//13
        name: "Girls Rock",
        userId: 5
      },
      {//14
        name: "Sweets",
        userId: 5
      },
      {//15
        name: "Fairytales",
        userId: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options)
  }
};
