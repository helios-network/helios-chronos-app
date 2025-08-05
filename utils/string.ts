import { formatDistanceToNow } from "date-fns"

export const getErrorMessage = (error: any) => {
  if (error && error.data && error.data.message) {
    let errorMessage = error.data.message
    errorMessage = errorMessage.replace(
      "rpc error: code = Internal desc = ",
      ""
    )
    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
    if (!errorMessage.endsWith(".")) {
      errorMessage += "."
    }

    return errorMessage
  }

  if (error.message) {
    let errorMessage = error.message
    if (errorMessage.includes("User denied")) {
      errorMessage = "User denied transaction signature."
    }

    if (errorMessage.includes("reverted")) {
      errorMessage = "An error occured, please try again."
    }

    return errorMessage
  }

  return false
}

export const formatHash = (
  hash: string,
  length: number = 6,
  suffixLength: number = 4
) => {
  return `${hash?.slice(0, length)}...${hash?.slice(-suffixLength)}`
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return formatDistanceToNow(date, { addSuffix: true })
}
