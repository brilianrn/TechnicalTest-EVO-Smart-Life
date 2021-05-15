const bcrypt = require('bcryptjs');

function hashPass(inputPass) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync("" + inputPass, salt);
  return hash;
}

function comparePass(inputPass, passDb) {
  const compare = bcrypt.compareSync(inputPass, passDb);
  console.log(process.env, '====')
  return compare;
}

const taxSell = 10;
const taxImport = 5;
let priceAfterTax = 0;
function beforeCreate(cart) {

  if (cart.type !== 'book' && cart.itemStatus === 'import') {
    console.log('masuk if')
    return cart.tax = taxSell + taxImport;
  } else if (cart.type === 'book' || cart.type === 'food' || cart.type === 'medicine' && cart.itemStatus === 'import') {
    return cart.tax = taxImport;
  } else if (cart.type !== 'book' || cart.type !== 'food' || cart.type !== 'medicine' && cart.itemStatus === 'local') {
    return cart.tax = taxSell;
  } else if (cart.type === 'book' || cart.type === 'food' || cart.type === 'medicine' && cart.itemStatus === 'local') {
    return cart.tax = 0;
  }
}

function cek(cart) {
  if (cart.type === 'book' || cart.type === 'food' || cart.type === 'medicine') {
    if (cart.itemStatus === 'import') {
      return taxImport
    } else if (cart.itemStatus === 'local') {
      return 0
    }
  } else if (cart.type !== 'book' || cart.type !== 'food' || cart.type !== 'medicine') {
    if (cart.itemStatus === 'import') {
      return taxImport + taxSell
    } else if (cart.itemStatus === 'local') {
      return taxSell
    }
  }
}

console.log(cek({
  type: 'micin',
  itemStatus: 'local'
}))