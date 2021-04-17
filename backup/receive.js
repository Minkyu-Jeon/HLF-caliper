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
    const otherWorkerId = (this.workerIndex + 1) % this.totalWorkers
    const assetID = `${otherWorkerId}_${workerSequentialId}`
    const product_name = `product_${otherWorkerId}_${workerSequentialId}`
    const myArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: 'ReceiveAsset',
      invokerIdentity: `User${this.workerIndex + 1}`,
      contractArguments: [assetID, product_name],
      readOnly: false 
    }
    
    this.index[this.workerIndex] += 1

    await this.sutAdapter.sendRequests(myArgs)
  }

  async cleanupWorkloadModule() {
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;