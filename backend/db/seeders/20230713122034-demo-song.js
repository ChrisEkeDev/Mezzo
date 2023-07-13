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
        name: "Midnight Whispers",
        description: "A dreamy and melancholic pop ballad with ethereal vocals and introspective lyrics that evoke a sense of longing and desire.",
        file: "/url-to-song",
        artistId: 1,
        genreId: 9
      },
      {//2
        name: "Shadows of Yesterday",
        description: "An atmospheric and introspective pop track that combines haunting melodies with electronic elements, exploring themes of nostalgia and self-reflection.",
        file: "/url-to-song",
        artistId: 1,
        genreId: 9
      },
      {//3
        name: "Fading Echoes",
        description: "A bittersweet and emotive pop song with atmospheric production, showcasing Luna Vega's captivating vocals and evocative storytelling.",
        file: "/url-to-song",
        artistId: 1,
        genreId: 8
      },
      {//4
        name: "Silent Storm",
        description: "A mesmerizing pop anthem with a powerful chorus and poignant lyrics, addressing the inner struggles and resilience of the human spirit.",
        file: "/url-to-song",
        artistId: 1,
        genreId: 8
      },
      {//5
        name: "Lost in Translation",
        description: "A catchy and infectious pop tune that explores the complexities of communication and emotional disconnect, delivered with Luna Vega's signature enchanting vocals.",
        file: "/url-to-song",
        artistId: 1,
        genreId: 9
      },
      {//6
        name: "Thunderstrike",
        description: "A high-octane rock anthem with electrifying guitar riffs, pounding drums, and Jax Sterling's raw vocals, delivering a burst of energy and adrenaline.",
        file: "/url-to-song",
        artistId: 2,
        genreId: 7
      },
      {//7
        name: "Rebel Heart",
        description: "A rebellious rock track infused with attitude and gritty guitars, capturing the spirit of defiance and individuality.",
        file: "/url-to-song",
        artistId: 2,
        genreId: 7
      },
      {//8
        name: "Rise from the Ashes",
        description: "An anthemic rock song that showcases Jax Sterling's dynamic guitar skills and powerful vocals, inspiring resilience and triumph over adversity.",
        file: "/url-to-song",
        artistId: 2,
        genreId: 7
      },
      {//9
        name: "Broken Chains",
        description: "A hard-hitting rock ballad that explores themes of personal liberation and breaking free from the constraints of the past.",
        file: "/url-to-song",
        artistId: 2,
        genreId: 7
      },
      {//10
        name: "Wildfire",
        description: "A fiery rock and roll track with infectious energy, showcasing Jax Sterling's rockstar persona and his ability to ignite a crowd.",
        file: "/url-to-song",
        artistId: 2,
        genreId: 7
      },
      {//11
        name: "Wanderlust",
        description: "A captivating blend of indie folk and electronica, \"Wanderlust\" takes listeners on a sonic journey through lush landscapes, driven by Echo Bloom's mesmerizing vocals and evocative storytelling.",
        file: "/url-to-song",
        artistId: 3,
        genreId: 5
      },
      {//12
        name: "Electric Dreams",
        description: "An ethereal and atmospheric indie folk track infused with electronic elements, painting a dreamscape of sonic textures and imaginative lyrics.",
        file: "/url-to-song",
        artistId: 3,
        genreId: 5
      },
      {//13
        name: "Into the Unknown",
        description: "A haunting and introspective indie folk ballad that combines acoustic instrumentation with electronic flourishes, diving deep into the mysteries of the human experience.",
        file: "/url-to-song",
        artistId: 3,
        genreId: 5
      },
      {//14
        name: "Dusk to Dawn",
        description: "A mesmerizing fusion of folk and electronica, \"Dusk to Dawn\" weaves a tale of longing and transformation, with Echo Bloom's enchanting voice guiding the listener through the shifting musical landscapes.",
        file: "/url-to-song",
        artistId: 3,
        genreId: 5
      },
      {//15
        name: "Aurora Skies",
        description: "A transcendent indie folk composition accompanied by electronic textures, \"Aurora Skies\" captures the beauty of nature and the human connection to the universe.",
        file: "/url-to-song",
        artistId: 3,
        genreId: 5
      },
      {//16
        name: "Starstruck",
        description: " A catchy pop anthem infused with electronic beats and Nova Skye's captivating vocals, delivering a burst of energy and infectious melodies.",
        file: "/url-to-song",
        artistId: 4,
        genreId: 9
      },
      {//17
        name: "Electric Love",
        description: "A feel-good pop track with an EDM twist, \"Electric Love\" combines uplifting lyrics, vibrant synths, and Nova Skye's dynamic vocals to create an irresistible dancefloor filler.",
        file: "/url-to-song",
        artistId: 4,
        genreId: 9
      },
      {//18
        name: "Ignite",
        description: "A high-energy pop/EDM fusion with powerful hooks and an explosive chorus, showcasing Nova Skye's vocal range and the infectious energy of her music.",
        file: "/url-to-song",
        artistId: 4,
        genreId: 9
      },
      {//19
        name: "Beyond the Horizon",
        description: "A euphoric EDM-pop crossover featuring Nova Skye's soaring vocals and an uplifting blend of pulsating beats and anthemic melodies, evoking a sense of limitless possibilities.",
        file: "/url-to-song",
        artistId: 4,
        genreId: 9
      },
      {//20
        name: "Glow Up",
        description: "A vibrant and empowering pop anthem with infectious energy, inspiring listeners to embrace their individuality and shine brightly.",
        file: "/url-to-song",
        artistId: 4,
        genreId: 9
      },
      {//21
        name: "Soul Serenade",
        description: "A soulful jazz composition featuring Solstice's impeccable musicianship, with a smooth blend of saxophone, piano, and drums, creating a serene and heartfelt musical experience.",
        file: "/url-to-song",
        artistId: 5,
        genreId: 11
      },
      {//22
        name: "Funky Groove Train",
        description: "A groovy fusion of funk and jazz, \"Funky Groove Train\" is a dynamic instrumental track that gets the audience moving with its infectious rhythm and spirited solos.",
        file: "/url-to-song",
        artistId: 5,
        genreId: 10
      },
      {//23
        name: "Midnight Jam",
        description: "A late-night jazz jam session that captures the spontaneity and improvisational prowess of Solstice, highlighting their chemistry as a trio and their ability to create a captivating musical dialogue.",
        file: "/url-to-song",
        artistId: 5,
        genreId: 10
      },
      {//24
        name: "Soulful Whispers",
        description: "A soul-infused jazz piece that combines lush melodies, velvety vocals, and intricate instrumentation, enveloping the listener in a warm and intimate musical embrace.",
        file: "/url-to-song",
        artistId: 5,
        genreId: 10
      },
      {//25
        name: "Jazz Odyssey",
        description: "An adventurous and exploratory jazz composition that showcases Solstice's virtuosity and their ability to seamlessly navigate complex musical landscapes.",
        file: "/url-to-song",
        artistId: 5,
        genreId: 10
      },
      {//26
        name: "Eternal Reverie",
        description: "A captivating instrumental piece led by Aria Rivers' enchanting violin, weaving a tapestry of emotions and transporting listeners to a realm of serene beauty.",
        file: "/url-to-song",
        artistId: 6,
        genreId: 6
      },
      {//27
        name: "Whispering Sonata",
        description: "A delicate and evocative composition that combines Aria Rivers' expressive violin with subtle piano melodies, painting a musical landscape of gentle whispers and profound emotions.",
        file: "/url-to-song",
        artistId: 6,
        genreId: 6
      },
      {//28
        name: "Mystic Enchantment",
        description: "An ethereal and enchanting fusion of classical and contemporary elements, showcasing Aria Rivers' virtuosity on the violin and her ability to evoke a sense of mystery and wonder.",
        file: "/url-to-song",
        artistId: 6,
        genreId: 6
      },
      {//29
        name: "Requiem of the Soul",
        description: "A poignant and introspective instrumental piece that reflects the depths of human emotions, with Aria Rivers' violin serving as a vessel for catharsis and introspection.",
        file: "/url-to-song",
        artistId: 6,
        genreId: 6
      },
      {//30
        name: "Celestial Serenade",
        description: " A celestial composition that merges classical elegance with contemporary sensibilities, featuring Aria Rivers' expressive violin melodies floating atop a backdrop of atmospheric sounds.",
        file: "/url-to-song",
        artistId: 6,
        genreId: 6
      },
      {//31
        name: "Cosmic Symphony",
        description: "A mesmerizing journey through cosmic soundscapes, blending ambient textures, pulsating beats, and ethereal melodies, crafted by the visionary producer and DJ, Orion Frost.",
        file: "/url-to-song",
        artistId: 7,
        genreId: 14
      },
      {//32
        name: "Transcendence",
        description: "A transcendent electronic track that pushes the boundaries of sonic exploration, with Orion Frost's intricate production, hypnotic rhythms, and otherworldly sound design guiding the listener to higher states of consciousness.",
        file: "/url-to-song",
        artistId: 7,
        genreId: 14
      },
      {//33
        name: "Stardust Dreams",
        description: "A dreamy and atmospheric composition that captures the essence of celestial beauty, as Orion Frost weaves a sonic tapestry of shimmering synths, celestial melodies, and pulsating beats.",
        file: "/url-to-song",
        artistId: 7,
        genreId: 14
      },
      {//34
        name: "Eclipse of the Mind",
        description: "A hypnotic and captivating trance-infused electronic masterpiece, taking listeners on a sonic journey through realms of deep introspection and euphoric release, meticulously crafted by Orion Frost.",
        file: "/url-to-song",
        artistId: 7,
        genreId: 14
      },
      {//35
        name: "Luminescence",
        description: "A luminous and immersive ambient track that envelops the listener in a cocoon of sonic serenity, as Orion Frost creates a sonic landscape teeming with ethereal textures and celestial atmospheres.",
        file: "/url-to-song",
        artistId: 7,
        genreId: 14
      },
      {//36
        name: "Soul's Lament",
        description: "A heartfelt and introspective ballad where Aurora Reed's soulful voice shines, weaving a tale of vulnerability and emotional resilience that resonates deep within the listener's heart.",
        file: "/url-to-song",
        artistId: 8,
        genreId: 3
      },
      {//37
        name: "Whispers of the Heart",
        description: "An intimate and soul-stirring composition that showcases Aurora Reed's expressive vocals and poetic storytelling, inviting listeners to lean in and listen closely to the whispers of the heart.",
        file: "/url-to-song",
        artistId: 8,
        genreId: 3
      },
      {//38
        name: "Unbreakable",
        description: "An empowering and uplifting anthem driven by Aurora Reed's soulful voice, inspiring listeners to rise above challenges and embrace their strength and resilience.",
        file: "/url-to-song",
        artistId: 8,
        genreId: 3
      },
      {//39
        name: "Serenade of the Soul",
        description: "A soulful and passionate serenade, crafted by Aurora Reed's evocative vocals and heartfelt lyrics, creating a musical experience that speaks directly to the depths of the soul.",
        file: "/url-to-song",
        artistId: 8,
        genreId: 3
      },
      {//40
        name: "Waves of Emotion",
        description: "A soul-infused ballad that ebbs and flows with emotional intensity, as Aurora Reed's captivating voice rides the waves of heartfelt lyrics, inviting listeners on an emotional journey.",
        file: "/url-to-song",
        artistId: 8,
        genreId: 3
      },
      {//41
        name: "Burning Desire",
        description: "A fiery rock anthem fueled by Ember Stone's powerful vocals and electrifying guitar riffs, igniting a passion that cannot be contained.",
        file: "/url-to-song",
        artistId: 9,
        genreId: 7
      },
      {//42
        name: "Rebellion",
        description: "A rebellious rock track that embodies the spirit of defiance, with Ember Stone's commanding vocals and gritty guitar riffs leading the charge.",
        file: "/url-to-song",
        artistId: 9,
        genreId: 7
      },
      {//43
        name: "Phoenix Rising",
        description: "A high-energy rock ballad that chronicles the journey of rising from the ashes, propelled by Ember Stone's emotive vocals and searing guitar solos.",
        file: "/url-to-song",
        artistId: 9,
        genreId: 7
      },
      {//44
        name: "Roar of the Wild",
        description: "A powerful and anthemic rock composition that captures the primal energy and untamed spirit of Ember Stone, delivering a sonic experience that resonates deep within the soul.",
        file: "/url-to-song",
        artistId: 9,
        genreId: 7
      },
      {//45
        name: "Rock 'n' Roll Revolution",
        description: "A dynamic and infectious rock and roll track that pays homage to the genre's roots, as Ember Stone's electrifying performance ignites a revolution of sound and spirit.",
        file: "/url-to-song",
        artistId: 9,
        genreId: 7
      },
      {//46
        name: "Dust on the Boots",
        description: "A classic country tale that paints a picture of life on the road, with Levi Sparks' smooth vocals and twangy guitar bringing the dusty trails to life.",
        file: "/url-to-song",
        artistId: 10,
        genreId: 4
      },
      {//47
        name: "Whiskey Nights",
        description: "A heartfelt country ballad that captures the essence of whiskey-soaked evenings, with Levi Sparks' rich vocals and emotive storytelling evoking memories of love and loss.",
        file: "/url-to-song",
        artistId: 10,
        genreId: 4
      },
      {//48
        name: "Open Road Serenade",
        description: "A spirited country anthem celebrating the freedom and joy of hitting the open road, accompanied by Levi Sparks' spirited vocals and foot-stomping rhythms.",
        file: "/url-to-song",
        artistId: 10,
        genreId: 4
      },
      {//49
        name: "Fields of Gold",
        description: "A heartfelt country tune that pays tribute to the simple joys of rural life, as Levi Sparks' smooth vocals and melodic guitar weave a musical tapestry of golden moments.",
        file: "/url-to-song",
        artistId: 10,
        genreId: 4
      },
      {//50
        name: "Honky-Tonk Heartache",
        description: "A toe-tapping country track that captures the bittersweet emotions of honky-tonk nights, as Levi Sparks' twang-filled vocals and lively instrumentation take center stage.",
        file: "/url-to-song",
        artistId: 10,
        genreId: 4
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkDelete(options)
  }
};
