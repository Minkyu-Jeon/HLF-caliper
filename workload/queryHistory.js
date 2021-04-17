'use strict'

const seeds = require('./seed.json')
const randomUpto = require('./utils/random')
const capitalize = require('./utils/capitalize')

class QueryHistory {
  static configuration() {

    const assetSize = seeds.length

    const assetIndex = randomUpto(assetSize)

    const { SerialNumber, ProductName, Seller } = seeds[assetIndex]

    const invokerIdentity = capitalize(Seller.split('@')[0])

    const myArgs = {
      contractFunction: 'queryHistory',
      invokerIdentity: invokerIdentity,
      contractArguments: [SerialNumber, ProductName],
      readOnly: false
    }

    return myArgs
  }
}

module.exports = QueryHistory;