const { verifyToken } = require('../helpers/jwt');
const { User, Item } = require('../models');

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

function authorization() {

}

module.exports = { authentication, authorization };