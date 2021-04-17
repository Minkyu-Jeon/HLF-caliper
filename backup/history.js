'use strict'

const { WorkloadModuleBase } = require('@hyperledger/caliper-core')

class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super()
  }

  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
    this.index = {}
    this.index[this.workerIndex] = 0
  }

  async submitTransaction() {
    const workerSequentialId = this.index[this.workerIndex]
    const assetID = `${this.workerIndex}_${workerSequentialId}`
    const product_name = `product_${this.workerIndex}_${workerSequentialId}`
    const myArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: 'queryHistory',
      invokerIdentity: `User${this.workerIndex + 1}`,
      contractArguments: [assetID, product_name],
      readOnly: true 
    }
    
    this.index[this.workerIndex] += 1

    await this.sutAdapter.sendRequests(myArgs)
  }

  async cleanupWorkloadModule() {
    for ( let i = 0; i < this.roundArguments.assets; i++ ) {
      const assetID = `${this.workerIndex}_${i}`
      const product_name = `product_${this.workerIndex}_${i}`
      console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`)
      const request = {
        contractId: this.roundArguments.contractId,
        contractFunction: 'DeleteAsset',
        invokerIdentity: `User${this.workerIndex + 1}`,
        contractArguments: [assetID, product_name],
        readOnly: false
      }

      await this.sutAdapter.sendRequests(request)
    }
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;