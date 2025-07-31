/**
 * Test utility to verify API calls work correctly
 * This can be used in the browser console to debug API issues
 */

export const testCronAPI = async (address: string) => {
  const rpcUrl = "http://91.99.37.116:8545"

  // Test with hex-encoded parameters
  const pageHex = "0x1" // page 1
  const pageSizeHex = "0xa" // pageSize 10

  console.log("Testing API call with:")
  console.log("Address:", address.toLowerCase())
  console.log("Page:", pageHex)
  console.log("PageSize:", pageSizeHex)

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getAccountCronsByPageAndSize",
        params: [address.toLowerCase(), pageHex, pageSizeHex],
        id: 1
      })
    })

    const data = await response.json()
    console.log("API Response:", data)

    if (data.error) {
      console.error("API Error:", data.error)
      return { success: false, error: data.error }
    }

    return { success: true, data: data.result }
  } catch (error) {
    console.error("Network Error:", error)
    return { success: false, error }
  }
}

export const testCronStatistics = async () => {
  const rpcUrl = "http://91.99.37.116:8545"

  console.log("Testing statistics API call...")

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getCronStatistics",
        params: [],
        id: 1
      })
    })

    const data = await response.json()
    console.log("Statistics Response:", data)

    if (data.error) {
      console.error("Statistics Error:", data.error)
      return { success: false, error: data.error }
    }

    return { success: true, data: data.result }
  } catch (error) {
    console.error("Network Error:", error)
    return { success: false, error }
  }
}

// Make functions available globally for testing
if (typeof window !== "undefined") {
  ;(window as any).testCronAPI = testCronAPI
  ;(window as any).testCronStatistics = testCronStatistics
}
