'use strict'

const { WorkloadModuleBase } = require('@hyperledger/caliper-core')
const randomUpto = require('./utils/random')
const Show = require('./show')
const Like = require('./like')
const Dislike = require('./dislike')
const QueryHistory = require('./queryHistory')


class MyWorkload extends WorkloadModuleBase {
  constructor() {
    super()
    this.workloads = [
      Show,
      Like,
      Dislike,
      QueryHistory
    ]
  }
  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
  }

  async submitTransaction() {
    const randomIndex = randomUpto(this.workloads.length)

    let request = {
      contractId: this.roundArguments.contractId
    }

    request = Object.assign(request, this.workloads[randomIndex].configuration())

    await this.sutAdapter.sendRequests(request)
  }
}

function createWorkloadModule() {
  return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;