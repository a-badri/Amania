'use strict';
// const {
//   Model
// } = require('sequelize');
// const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `please provide a name for your product`
          },
          notEmpty: {
            msg: `please provide a name for your product`
          },
          len: {
            msg: `the name of the product can't be longer than 50 characters`
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `please provide a description for your product`
          },
          notEmpty: {
            msg: `please provide a description for your product`
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `please provide a price for your product`
          },
          notEmpty: {
            msg: `please provide a price for your product`
          }
        }
      }
    }, {})

    Product.association = function(models) {
      Product.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      });
      Product.belongsTo(models.Store, {
        as: `store`,
        foreignKey: `storeId`
      })
    }
 
  return Product;
};
