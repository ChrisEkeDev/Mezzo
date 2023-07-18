'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Artists';
    await queryInterface.bulkInsert(options, [
      {//1
        name: "FASSounds",
        bio: null,
        userId: 2,
        image: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/fassounds.png"
      },
      {//2
        name: "Serge Pavkin",
        bio: "Hi, you can use my music for free in your YouTube videos&shorts, TikTok videos, Facebook and Instagram Reels (find my tracks in the Facebook/Instagram audio library).",
        userId: 3,
        image: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/sergepavkin.jpg"
      },
      {//3
        name: "Soul Music",
        bio: "Hi my name is Oleg. I live and work in Krivoy Rog, Ukraine. My target is to make high-quality music which may become a great background for your projects! Check it out!",
        userId: 4,
        image: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/sprod.jpg"
      },
      {//4
        name: "Marko Topa",
        bio: "My brother and I decided to devote ourselves to our childhood. The warmest memories and friends. Marko Topa is a nickname made up of the names of our dogs Marko and Topa. These two dogs have always been our loyal friends, it's a pity that time drags on for a long time and the years fly by quickly.",
        userId: 5,
        image: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/markotopaimage.png"
      },
      {//5
        name: "Ashot Danielyan",
        bio: "Ashot Danielyan is a pianist and film composer, He composes music in a variety of styles and genres. His favourite instrument remains the piano, which he includes prominently in most of his music.",
        userId: 1,
        image: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/ashotdanielyn.jpg"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Artists';
    await queryInterface.bulkDelete(options)
  }
};
