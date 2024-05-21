'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Item.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    tax: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    hooks: {
      beforeCreate(item) {
        if (item.status === 'import') {
          item.tax = 5;
        } else if (item.status === 'local') {
          item.tax = 0;
        }
      }
    }
  });
  return Item;
};