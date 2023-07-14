'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserArtistFavorite extends Model {
    static associate(models) {
      UserArtistFavorite.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
      UserArtistFavorite.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        targetKey: 'id'
      })
    }
  }
  UserArtistFavorite.init({
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
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UserArtistFavorite',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return UserArtistFavorite;
};
