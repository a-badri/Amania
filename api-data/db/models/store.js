'use strict';

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `please provide a name for your store`
        },
        notEmpty: {
          msg: `please provide a name for your store`
        },
        len: {
          msg: `the store name can't be longer than 50 characters`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `please choose a category for your store`
        },
        notEmpty: {
          msg: `please choose a category for your store`
        }
      }
    }
  }, {})
  Store.Association = function(models) {
    Store.belongTo(models.User, {
      as: "user",
      foreignKey: "userId"
    })
  }
  return Store;
};
