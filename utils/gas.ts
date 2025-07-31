import { GasPriceOption } from "@/stores/app"

export const getGasPriceLabel = (option: GasPriceOption): string => {
  switch (option) {
    case "low":
      return "Slow"
    case "average":
      return "Standard"
    case "fast":
      return "Fast"
    default:
      return "Standard"
  }
}

export const getGasPriceTimeEstimate = (option: GasPriceOption): string => {
  switch (option) {
    case "low":
      return "~30 seconds"
    case "average":
      return "~15 seconds"
    case "fast":
      return "~5 seconds"
    default:
      return "~15 seconds"
  }
}

export const formatGasPrice = (gasPrice: string | number): string => {
  const price = typeof gasPrice === "string" ? parseInt(gasPrice) : gasPrice
  return (price / 1e9).toFixed(2) + " Gwei"
}

export const formatGasUsed = (gasUsed: string | number): string => {
  const used = typeof gasUsed === "string" ? parseInt(gasUsed) : gasUsed
  return used.toLocaleString()
}
