'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(`User`, {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: `please provide a value for username`
        },
        notEmpty: {
          msg: `please provide a value for username`
        },
        len: {
          args: [0, 50],
          msg: `username can't be longer than 50 characters`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: `please provide a value for email`
        },
        notEmpty: {
          msg: `please provide a value for email`
        },
        len: {
          args: [0,250],
          msg: `email can't be longer than 250 chars`
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    }
    
  }, {})
  User.association = function(models) {
    User.hasMany(models.Store, {
      as: "stores",
      foreignKey: "userId"
    })
  }
  User.association = function(models) {
    User.hasMany(models.Product, {
      as: "products",
      foreignKey: "userId"
    })
  }

  return User;
};
