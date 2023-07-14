'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
      Playlist.hasMany(models.PlaylistSong, {
        foreignKey: 'playlistId',
        sourceKey: 'id'
      })
      Playlist.belongsToMany(models.Song, {
        through: models.PlaylistSong,
        foreignKey: 'playlistId',
        otherKey: 'songId',
        sourceKey: 'id',
        targetKey: 'id'
      })
    }
  }
  Playlist.init({
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
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
