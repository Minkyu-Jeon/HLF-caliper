const unirand = require('unirand')
const randomUpto = (limit) => {
  return Math.ceil(unirand.random() * (limit - 1))
}

module.exports = randomUpto