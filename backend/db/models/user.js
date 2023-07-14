'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Artist, {
        foreignKey: 'userId',
        sourceKey: 'id'
      })
      User.hasMany(models.Playlist, {
        foreignKey: 'userId',
        sourceKey: 'id'
      })
      User.hasMany(models.UserArtistFavorite, {
        foreignKey: 'userId',
        sourceKey: 'id'
      })
      User.belongsToMany(models.Artist, {
        through: models.UserArtistFavorite,
        foreignKey: 'userId',
        otherKey: 'artistId',
        sourceKey: 'id',
        targetKey: 'id'
      })
      User.hasMany(models.UserSongFavorite, {
        foreignKey: 'userId',
        sourceKey: 'id'
      })
      User.belongsToMany(models.Song, {
        through: models.UserSongFavorite,
        foreignKey: 'userId',
        otherKey: 'songId',
        sourceKey: 'id',
        targetKey: 'id'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isNotEmail(value) {
        if (Validator.isEmail(value)) {
          throw new Error("Cannot be an email.");
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'password']
      }
    }
  });
  return User;
};
