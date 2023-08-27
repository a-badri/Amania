'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(`User`, {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: `this username already been used`
      },
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
      unique: {
        args: true,
        msg: `this email has been used, try a different email`
      },
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
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
  
  User.prototype.validatePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword.toString())
  }

  return User;
};
