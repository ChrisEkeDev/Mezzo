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
        name: "Ambient Sounds",
        userId: 2
      },
      {//1
        name: "Vybrations",
        userId: 2
      },
      {//1
        name: "Study Mode",
        userId: 2
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options)
  }
};
