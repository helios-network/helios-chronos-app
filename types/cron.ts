export interface Cron {
  id: number
  ownerAddress: string
  contractAddress: string
  abiJson: string
  methodName: string
  params: string[]
  nextExecutionBlock: number
  expirationBlock: number
  executionStage: ExecutionStage
  gasLimit: number
  maxGasPrice: string | null
  totalExecutedTransactions: number
  totalFeesPaid: string | null
  cronType: string
  queueTimestamp: number
  frequency: number
  archived: boolean
}

export enum ExecutionStage {
  PENDING = 0,
  EXECUTING = 1,
  COMPLETED = 2,
  FAILED = 3,
  EXPIRED = 4
}

export interface CronTransaction {
  blockHash: string
  blockNumber: string
  chainId: string
  cronId: number
  cronAddress: string
  from: string
  gas: string
  gasPrice: string
  hash: string
  input: string
  nonce: string
  r: string
  s: string
  to: string
  transactionIndex: string
  type: string
  v: string
  value: string
}

export interface CronTransactionReceipt {
  blockHash: string
  blockNumber: string
  contractAddress: string
  cronAddress: string
  cronId: number
  cumulativeGasUsed: string
  from: string
  gasUsed: string
  logs: any[]
  logsBloom: string
  result: string
  ret: string
  status: string
  to: string
  transactionHash: string
  transactionIndex: string
  type: string
  vmError: string
}

export interface CronStatistics {
  cronCount: number
  queueCount: number
  archivedCrons: number
  refundedLastBlockCount: number
  executedLastBlockCount: number
}

export interface CronListResponse {
  crons: Cron[]
  totalCount: number
  page: number
  pageSize: number
}
