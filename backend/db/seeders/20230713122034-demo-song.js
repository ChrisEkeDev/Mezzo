'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkInsert(options, [
      {//1
        name: "Emotional Apogee",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/emotional-thoughtful-piano-141580.mp3",
        artistId: 5,
        genreId: 14
      },
      {//2
        name: "Celesta",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/mysterious-celesta-114064.mp3",
        artistId: 5,
        genreId: 14
      },
      {//3
        name: "Night Street",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/relaxed-vlog-night-street-131746.mp3",
        artistId: 5,
        genreId: 14
      },
      {//4
        name: "Etheral Meditation",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/ethereal-meditation-airy-and-tranquil-110249.mp3",
        artistId: 5,
        genreId: 14
      },
      {//5
        name: "Flying in the Dream",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/a-meditation-flying-in-the-dream-118554.mp3",
        artistId: 5,
        genreId: 14
      },
      {//6
        name: "August",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/august-145937.mp3",
        artistId: 4,
        genreId: 12
      },
      {//7
        name: "Autumn Rain",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/autumn-rain-152698.mp3",
        artistId: 4,
        genreId: 12
      },
      {//8
        name: "Gone Fishing",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/fishing-145933.mp3",
        artistId: 4,
        genreId: 12
      },
      {//9
        name: "Goodbye",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/goodbye-144313.mp3",
        artistId: 4,
        genreId: 12
      },
      {//10
        name: "In June",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/june-145936.mp3",
        artistId: 4,
        genreId: 12
      },
      {//11
        name: "Bewitched",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/bewitched-121509.mp3",
        artistId: 3,
        genreId: 15
      },
      {//12
        name: "Delhi",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/delhi-136163.mp3",
        artistId: 3,
        genreId: 15
      },
      {//13
        name: "Hush",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/hush-141326.mp3",
        artistId: 3,
        genreId: 15
      },
      {//14
        name: "My Time",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/my-time-143975.mp3",
        artistId: 3,
        genreId: 15
      },
      {//15
        name: "SloMo",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/slomo-135807.mp3",
        artistId: 3,
        genreId: 15
      },
      {//16
        name: "Best Time",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/best-time-112194.mp3",
        artistId: 1,
        genreId: 5
      },
      {//17
        name: "Fun Life",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/fun-life-112188.mp3",
        artistId: 1,
        genreId: 5
      },
      {//18
        name: "Chill",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/lofi-chill-140858.mp3",
        artistId: 1,
        genreId: 5
      },
      {//19
        name: "Study Time",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/lofi-study-112191.mp3",
        artistId: 1,
        genreId: 5
      },
      {//20
        name: "Street Food",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/street-food-112193.mp3",
        artistId: 1,
        genreId: 5
      },
      {//21
        name: "Deep in the Ocean",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/deep-in-the-ocean-116172.mp3",
        artistId: 2,
        genreId: 14
      },
      {//22
        name: "Field Grass",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/field-grass-115973.mp3",
        artistId: 2,
        genreId: 14
      },
      {//23
        name: "Reflected Light",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/reflected-light-147979.mp3",
        artistId: 2,
        genreId: 14
      },
      {//24
        name: "Smooth Waters",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/smooth-waters-115977.mp3",
        artistId: 2,
        genreId: 14
      },
      {//25
        name: "Summer Adventures",
        description: null,
        song: "https://mezzo-bucket.s3.us-east-2.amazonaws.com/summer-adventures-115949.mp3",
        artistId: 2,
        genreId: 14
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkDelete(options)
  }
};
