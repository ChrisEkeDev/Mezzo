'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      Artist.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
    }
  }
  Artist.init({
    id: {
      type:DataTypes.INTEGER,
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
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 500
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'Artist',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt']
      }
    }
  });
  return Artist;
};
