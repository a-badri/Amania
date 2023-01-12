'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(`Address`, {
    street: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    State: {
      allowNull: false,
      type: DataTypes.STRING(2)
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  })

  Address.association = function(models) {
    Address.belongsTo(models.User, {
      as: `user`,
      foreignKey: `userId`
    })
  }
  return Address;
};
