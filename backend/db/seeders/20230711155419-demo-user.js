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
        username: "demo",
        email: 'demo@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 2
        username: "ekeman",
        email: 'ceke@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 3
        username: "johndoe",
        email: 'jdoe@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 4
        username: "jmack123",
        email: 'jmackelroy@email.com',
        password: bcrypt.hashSync('password', 13),
      },
      {// 5
        username: "mshills44",
        email: 'shills@email.com',
        password: bcrypt.hashSync('password', 13),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options)
  }
};
