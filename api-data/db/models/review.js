'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(`Review`, {
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  })

  Review.association = function(models) {
    Review.belongsTo(models.User, {
      as: `user`,
      foreignKey: `userId`
    })
    Review.belongsTo(models.Product, {
      as: `product`,
      foreignKey: `productId`
    })
  }
  return Review;
};
