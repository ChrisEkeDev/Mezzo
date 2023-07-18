'use strict';

const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {// 1
        username: "ashotdani",
        email: 'ashotdani@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 2
        username: "fassounds",
        email: 'fassounds@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 3
        username: "sergepavkin",
        email: 'sergepavkin@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 4
        username: "soulmusic",
        email: 'soulmusic@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 5
        username: "markotopa",
        email: 'markotopa@email.com',
        password: bcrypt.hashSync('password', 13),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options)
  }
};
