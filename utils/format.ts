/**
 * Format an Ethereum address to show first 6 and last 4 characters
 */
export const formatAddress = (address: string): string => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format a transaction hash to show first 8 and last 6 characters
 */
export const formatTxHash = (hash: string): string => {
  if (!hash) return ""
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

/**
 * Format Wei to Ether with specified decimal places
 */
export const formatEther = (
  wei: string | number,
  decimals: number = 6
): string => {
  const weiValue = typeof wei === "string" ? BigInt(wei) : BigInt(wei)
  const etherValue = Number(weiValue) / 1e18
  return etherValue.toFixed(decimals)
}

/**
 * Format a large number with appropriate suffixes (K, M, B)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"
  }
  return num.toString()
}

/**
 * Format block number with commas
 */
export const formatBlockNumber = (blockNumber: number | string): string => {
  const num =
    typeof blockNumber === "string" ? parseInt(blockNumber) : blockNumber
  return num.toLocaleString()
}
