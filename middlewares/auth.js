const { verifyToken } = require('../helpers/jwt');
const { User, Item, Cart } = require('../models');

function authentication(req, res, next) {
  try {
    let { id, email, name } = verifyToken(req.headers.access_token);

    User.findOne({ where: { id, email, name } })
      .then(data => {
        req.currentUser = {
          id: data.id,
          email: data.email,
          name: data.name
        }
        next();
      })
      .catch(err => {
        throw new Error({
          name: 'Unautheticate'
        });;
      })
  } catch (error) {
    next({
      name: 'Unautheticate'
    });
  }
}

function authorization(req, res, next) {
  if (req.params.id) {
    Cart.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        if (+data.UserId === +req.currentUser.id) {
          next();
        } else {
          throw new Error({
            name: 'Unauthorization'
          })
        }
      })
      .catch(err => {
        next(err);
      })
  } else {
    Cart.findAll()
      .then(data => {
        if (+data[0].UserId === +req.currentUser.id) {
          next();
        } else {
          throw new Error({
            name: 'Unauthorization'
          })
        }
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = { authentication, authorization };