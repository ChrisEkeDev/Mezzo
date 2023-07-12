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
        name: "Luna Vega",
        bio: "Luna Vega is an enigmatic singer-songwriter known for her haunting melodies and introspective lyrics. With a voice that captivates listeners, she effortlessly weaves tales of love, loss, and self-discovery",
        userId: 1,
        image: "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1129&q=80"
      },
      {//2
        name: "Jax Sterling",
        bio: "Jax Sterling is a dynamic rock guitarist who brings raw energy to the stage. His electrifying solos and catchy riffs have earned him a reputation as a true guitar virtuoso, making him a force to be reckoned with in the music industry.",
        userId: 1,
        image: "https://images.unsplash.com/photo-1490915829216-3f2347b1e830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {//3
        name: "Echo Bloom",
        bio: "Echo Bloom is a genre-bending artist whose music combines elements of folk, indie rock, and electronica. With introspective lyrics and lush soundscapes, Echo Bloom creates a sonic journey that transports listeners to ethereal realms.",
        userId: 2,
        image: "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1077&q=80"
      },
      {//4
        name: "Nova Skye",
        bio: "Nova Skye is a rising star in the world of electronic music. Her infectious beats and mesmerizing vocals have earned her a dedicated fan base. With a unique blend of pop and EDM, Nova Skye is redefining the boundaries of contemporary music.",
        userId: 2,
        image: "https://images.unsplash.com/photo-1538330627166-33d1908c210d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {//5
        name: "Solstice",
        bio: "Solstice is a jazz-inspired trio known for their improvisational skills and intricate compositions. Comprising a pianist, bassist, and drummer, they create a harmonious fusion of traditional jazz with elements of funk and soul",
        userId: 3,
        image: "https://images.unsplash.com/photo-1483393458019-411bc6bd104e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
      },
      {//6
        name: "Aria Rivers",
        bio: "Aria Rivers is a classically trained violinist who pushes the boundaries of traditional music. With her emotive playing and innovative techniques, she creates captivating compositions that bridge the gap between classical and contemporary genres.",
        userId: 3,
        image: "https://images.unsplash.com/photo-1621281498929-4153a474f603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {//7
        name: "Orion Frost",
        bio: "Orion Frost is a visionary producer and DJ, renowned for his mesmerizing electronic soundscapes and infectious beats. His music takes listeners on a sonic journey through cosmic landscapes, blending elements of ambient, trance, and downtempo.",
        userId: 4,
        image: "https://images.unsplash.com/photo-1520012046139-d5cc1ee6f11c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {//8
        name: "Aurora Reed",
        bio: "Aurora Reed is a singer-songwriter with a soulful voice and a knack for storytelling. Her heartfelt lyrics and soulful melodies resonate with audiences, creating an emotional connection that leaves a lasting impression.",
        userId: 4,
        image: "https://images.unsplash.com/photo-1621784166258-c6fdfff31879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {//9
        name: "Ember Stone",
        bio: "Ember Stone is a charismatic frontwoman of a high-energy rock band. Known for her powerful vocals and captivating stage presence, she commands the audience's attention with her raw passion and unapologetic lyrics.",
        userId: 5,
        image: "https://images.unsplash.com/photo-1521198022873-af0f772bf653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1137&q=80"
      },
      {//10
        name: "Levi Sparks",
        bio: "Levi Sparks is a country music sensation known for his heartfelt ballads and foot-stomping anthems. With his smooth vocals and relatable storytelling, Levi Sparks has become a favorite among country music lovers around the world.",
        userId: 5,
        image: "https://images.unsplash.com/photo-1521394095254-d70a3fe40353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2003&q=80"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Artists';
    await queryInterface.bulkDelete(options)
  }
};
