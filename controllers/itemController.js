const { Item } = require('../models');

class ItemController {
  static showItems(req, res, next) {
    Item.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }

  static showItem(req, res, next) {
    let id = +req.params.id;

    Item.findOne({ where: { id } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }

  static addItem(req, res, next) {
    let newItem = {
      name: req.body.name,
      amount: req.body.amount,
      price: req.body.price,
      type: req.body.type,
      status: req.body.status,
      image: req.body.image,
      tax: undefined
    };

    Item.create(newItem)
      .then(data => {
        res.status(201).json({ message: `${data.name} success to created` })
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static editItem(req, res, next) {
    let id = req.params.id;
    let oldItem = {};

    if (req.body.status === 'import') {
      oldItem = {
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        type: req.body.type,
        status: req.body.status,
        image: req.body.image,
        tax: 5
      };
    } else if (req.body.status === 'local') {
      oldItem = {
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        type: req.body.type,
        status: req.body.status,
        image: req.body.image,
        tax: 0
      };
    }

    Item.update(oldItem, {
      where: { id }
    })
      .then(data => {
        res.status(200).json({ message: `Item with id ${id} success to updated` });
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }

  static deleteItem(req, res, next) {
    let id = req.params.id;

    Item.destroy({ where: { id } })
      .then(_ => {
        res.status(200).json({ message: `Item with id ${id} success to deleted` });
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }
}

module.exports = ItemController;