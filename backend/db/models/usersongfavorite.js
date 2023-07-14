'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSongFavorite extends Model {
    static associate(models) {
      UserSongFavorite.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
      UserSongFavorite.belongsTo(models.Song, {
        foreignKey: 'songId',
        targetKey: 'id'
      })
    }
  }
  UserSongFavorite.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UserSongFavorite',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return UserSongFavorite;
};
