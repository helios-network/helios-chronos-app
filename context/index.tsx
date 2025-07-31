"use client"

import {
  heliosChain,
  projectId,
  toAppKitNetwork,
  wagmiAdapter
} from "@/config/wagmi"
import {
  mainnet,
  polygonAmoy,
  sepolia,
  bscTestnet,
  avalancheFuji
} from "@reown/appkit/networks"
import { createAppKit, SIWXMessage, SIWXSession } from "@reown/appkit/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, type ReactNode } from "react"
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"

const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    placeholderData: (prev: any) => prev,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  }
})

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// Set up metadata
const metadata = {
  name: "Chronos App",
  description: "Automated Task Scheduler for Helios Blockchain",
  url: "http://localhost:3001/",
  icons: ["http://localhost:3001/img/logo.png"]
}

// Create a function to handle session storage
const SESSION_STORAGE_KEY = "chronos_app_session"

const saveSession = (session: SIWXSession): void => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

const getSession = (): SIWXSession | null => {
  const sessionData = localStorage.getItem(SESSION_STORAGE_KEY)
  return sessionData ? JSON.parse(sessionData) : null
}

const clearSession = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

// Update your modal configuration
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [
    toAppKitNetwork(heliosChain),
    toAppKitNetwork(mainnet),
    toAppKitNetwork(sepolia),
    toAppKitNetwork(polygonAmoy),
    toAppKitNetwork(bscTestnet),
    toAppKitNetwork(avalancheFuji)
  ],
  defaultNetwork: toAppKitNetwork(heliosChain),
  metadata: metadata,
  features: {
    analytics: false
  },
  siwx: {
    createMessage: async (input): Promise<SIWXMessage> => {
      const message: SIWXMessage = {
        accountAddress: input.accountAddress,
        chainId: input.chainId,
        domain: "Chronos App",
        uri: "http://localhost:3001",
        version: "1",
        nonce: "nonce",
        statement: "Sign in to manage your automated tasks.",
        issuedAt: new Date().toISOString(),
        toString: function (): string {
          return `
            ${this.domain} wants you to sign in with your account:
            ${this.accountAddress}

            URI: ${this.uri}
            Version: ${this.version}
            Chain ID: ${this.chainId}
            Nonce: ${this.nonce}
            Issued At: ${this.issuedAt}
          `.trim()
        }
      }
      return message
    },
    addSession: async (session: SIWXSession): Promise<void> => {
      console.log("Adding session:", session)
      saveSession(session)
    },
    revokeSession: async (chainId: string, address: string): Promise<void> => {
      console.log(`Revoking session for ${address} on chain ${chainId}`)
      clearSession()
    },
    setSessions: async (sessions: SIWXSession[]): Promise<void> => {
      console.log("Setting sessions:", sessions)
      if (sessions.length > 0) {
        saveSession(sessions[0])
      } else {
        clearSession()
      }
    },
    getSessions: async (
      chainId: string,
      address: string
    ): Promise<SIWXSession[]> => {
      console.log(`Getting sessions for ${address} on chain ${chainId}`)
      const session = getSession()
      return session ? [session] : []
    }
  }
})

type ContextProviderProps = {
  children: ReactNode
  cookies: string | null
}

function ContextProvider({ children, cookies }: ContextProviderProps) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      const session = getSession()
      if (session) {
        console.log("Existing session found:", session)
      }
    }

    checkSession()
  }, [])

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
