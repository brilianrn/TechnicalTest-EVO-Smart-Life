const { User } = require('../models');
const { comparePass } = require('../helpers/hashPass');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ where: { email } })
      .then(data => {
        if (data) {
          const cekPass = comparePass(password, data.password);

          if (cekPass) {
            const payload = { id: data.id, email: data.email, name: data.name };
            const access_token = generateToken(payload);

            res.status(200).json({ access_token, name: data.name });
          } else {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err, 'Invalid email/password');
        next({
          name: 'loginFail'
        });
      })
  }

  static register(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      picture: req.body.picture,
      money: undefined
    }

    User.create(newUser)
      .then(data => {
        console.log(data)
        res.status(201).json({ message: `${data.name} success to created` });
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }
}

module.exports = UserController;