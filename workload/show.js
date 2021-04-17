'use strict'

const seeds = require('./seed.json')
const randomUpto = require('./utils/random')
const capitalize = require('./utils/capitalize')

class Show {
  static configuration() {

    const assetSize = seeds.length

    const assetIndex = randomUpto(assetSize)

    const { SerialNumber, ProductName, Seller } = seeds[assetIndex]

    const invokerIdentity = capitalize(Seller.split('@')[0])

    const myArgs = {
      contractFunction: 'Show',
      invokerIdentity: invokerIdentity,
      contractArguments: [SerialNumber, ProductName],
      readOnly: true 
    }

    return myArgs
  }
}

module.exports = Show;