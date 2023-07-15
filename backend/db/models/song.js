'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      Song.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        targetKey: 'id'
      })
      Song.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        targetKey: 'id'
      })
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        foreignKey: 'songId',
        otherKey: 'playlistId',
        sourceKey: 'id',
        targetKey: 'id'
      })
      Song.hasMany(models.PlaylistSong, {
        foreignKey: 'songId',
        sourceKey: 'id'
      })
      Song.hasMany(models.UserSongFavorite, {
        foreignKey: 'songId',
        sourceKey: 'id'
      })
      Song.belongsToMany(models.User, {
        through: models.UserSongFavorite,
        foreignKey: 'songId',
        otherKey: 'userId',
        sourceKey: 'id',
        targetKey: 'id'
      })
    }
  }
  Song.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        max: 500
      }
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Song',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Song;
};
