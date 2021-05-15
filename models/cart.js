'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  };
  Cart.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    itemStatus: DataTypes.STRING,
    cartStatus: DataTypes.STRING,
    amout: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate(cart) {
        const taxSell = 10;
        const taxImport = 5;
        let priceAfterTax = 0;

        if (cart.type === 'book' || cart.type === 'food' || cart.type === 'medicine') {
          if (cart.itemStatus === 'import') {
            cart.tax = taxImport;
          } else if (cart.itemStatus === 'local') {
            cart.tax = 0;
          }
        } else if (cart.type !== 'book' || cart.type !== 'food' || cart.type !== 'medicine') {
          if (cart.itemStatus === 'import') {
            cart.tax = taxImport + taxSell;
          } else if (cart.itemStatus === 'local') {
            cart.tax = taxSell;
          }
        }

        priceAfterTax = ((cart.tax/100) * +cart.price) + cart.price;
        cart.totalPrice = +priceAfterTax * +cart.amout;
      }
    }
  });
  return Cart;
};