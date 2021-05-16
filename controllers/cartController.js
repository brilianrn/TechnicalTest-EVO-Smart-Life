const { Cart } = require('../models');

class CartController {
  static addCart(req, res, next) {
    let newCart = {
      name: req.body.name,
      amout: +req.body.amount,
      type: req.body.type,
      itemStatus: req.body.itemStatus,
      cartStatus: req.body.cartStatus,
      price: req.body.price,
      tax: undefined,
      totalPrice: undefined,
      UserId: +req.currentUser.id
    };

    Cart.create(newCart)
      .then(data => {
        res.status(201).json({ message: `${data.name} success added to your cart` });
      })
      .catch(err => {
        next(err);
      })
  }

  static showCarts(req, res, next) {
    Cart.findAll()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(err => {
        next(err);
      })
  }

  static showCart(req, res, next) {
    let id = +req.params.id;

    Cart.findOne({ where: { id } })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(err => {
        next(err);
      })
  }

  static editCart(req, res, next) {
    let id = +req.params.id;
    let oldCart = {};
    const taxSell = 10;
    const taxImport = 5;

    if (!req.body.checkout) {
      Cart.findOne({ where: { id } })
        .then(findCart => {
          if (findCart.type === 'book' || findCart.type === 'food' || findCart.type === 'medicine') {
            if (findCart.itemStatus === 'import') {
              oldCart = {
                name: findCart.name,
                amout: +req.body.amount,
                type: findCart.type,
                itemStatus: findCart.itemStatus,
                cartStatus: findCart.cartStatus,
                price: findCart.price,
                tax: taxImport,
                totalPrice: (((taxImport / 100) * +findCart.price) + findCart.price) * ++req.body.amount,
                UserId: +req.currentUser.id
              };
            } else if (findCart.itemStatus === 'local') {
              oldCart = {
                name: findCart.name,
                amout: +req.body.amount,
                type: findCart.type,
                itemStatus: findCart.itemStatus,
                cartStatus: findCart.cartStatus,
                price: findCart.price,
                tax: 0,
                totalPrice: (((0 / 100) * +findCart.price) + findCart.price) * ++req.body.amount,
                UserId: +req.currentUser.id
              };
            }
          } else if (findCart.type !== 'book' || findCart.type !== 'food' || findCart.type !== 'medicine') {
            if (findCart.itemStatus === 'import') {
              oldCart = {
                name: findCart.name,
                amout: +req.body.amount,
                type: findCart.type,
                itemStatus: findCart.itemStatus,
                cartStatus: findCart.cartStatus,
                price: findCart.price,
                tax: taxSell + taxImport,
                totalPrice: ((((taxImport + taxSell) / 100) * +findCart.price) + findCart.price) * ++req.body.amount,
                UserId: +req.currentUser.id
              };
            } else if (findCart.itemStatus === 'local') {
              oldCart = {
                name: findCart.name,
                amout: +req.body.amount,
                type: findCart.type,
                itemStatus: findCart.itemStatus,
                cartStatus: findCart.cartStatus,
                price: findCart.price,
                tax: taxSell,
                totalPrice: (((taxSell / 100) * +findCart.price) + findCart.price) * ++req.body.amount,
                UserId: +req.currentUser.id
              };
            }
          }

          Cart.update(oldCart, {
            where: { id }
          })
            .then(data => {
              res.status(200).json({ message: `Cart with id ${id} success to updated` });
            })
            .catch(err => {
              next(err);
            })
        })
        .catch(err => {
          next(err);
        })
    }
  }

  static deleteCart(req, res, next) {
    let id = +req.params.id;

    Cart.destroy({ where: { id } })
      .then(_ => {
        res.status(200).json({ message: `Cart with id ${id} success to deleted` });
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = CartController;