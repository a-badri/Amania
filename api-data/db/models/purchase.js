'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(`Purchase`, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {})

  Purchase.association = function(models) {
    Purchase.belongsTo(models.User, {
      as: `user`,
      foreignKey: `userId`
    })
  }

  Purchase.association = function(models) {
    Purchase.belongsTo(models.Product, {
      as: `product`,
      foreignKey: `productId`
    })
  }
  return Purchase;
};
