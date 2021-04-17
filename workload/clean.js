'use strict'

const { WorkloadModuleBase } = require('@hyperledger/caliper-core')

class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super()
  }
  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
  }

  async submitTransaction() {
    const request = {
      contractId: this.roundArguments.contractId,
      contractFunction: 'ClearLedger',
      invokerIdentity: `User${this.workerIndex + 1}`,
      contractArguments: [],
      readOnly: false
    }
    await this.sutAdapter.sendRequests(request)
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;