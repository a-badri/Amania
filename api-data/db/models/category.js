'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(`Category`, {
    nameCat: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
  return Category;
};
