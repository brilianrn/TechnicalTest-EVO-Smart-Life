const bcrypt = require('bcryptjs');

function hashPass(inputPass) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync("" + inputPass, salt);
  return hash;
}

function comparePass(inputPass, passDb) {
  const compare = bcrypt.compareSync(inputPass, passDb);
  console.log(inputPass, passDb, compare, '>>>>>>>>>>')
  return compare;
}

module.exports = { hashPass, comparePass };