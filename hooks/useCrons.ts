"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getRpcUrl } from "@/config/rpc";
import { Cron, CronListResponse } from "@/types/cron";

interface GetAccountCronsParams {
  address: string;
  page?: number;
  pageSize?: number;
}

const fetchAccountCrons = async ({
  address,
  page = 1,
  pageSize = 10,
}: GetAccountCronsParams): Promise<CronListResponse> => {
  const rpcUrl = getRpcUrl();

  // Ensure address is properly formatted (lowercase)
  const formattedAddress = address.toLowerCase();

  // Convert page and pageSize to hex strings as expected by the API
  const pageHex = `0x${page.toString(16)}`;
  const pageSizeHex = `0x${pageSize.toString(16)}`;

  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getAccountCronsByPageAndSize",
      params: [formattedAddress, pageHex, pageSizeHex],
      id: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    console.error("RPC Error:", data.error);
    throw new Error(data.error.message || "Failed to fetch crons");
  }

  // The API returns the crons directly in the result
  // Handle both array results and null/undefined results
  let crons: Cron[] = [];

  if (Array.isArray(data.result)) {
    crons = data.result;
  } else if (data.result === null || data.result === undefined) {
    // No crons found for this address - this is normal
    crons = [];
  } else {
    // Unexpected result format, default to empty array
    crons = [];
  }

  return {
    crons,
    totalCount: crons.length,
    page,
    pageSize,
  };
};

export const useCrons = () => {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ["crons", address],
    queryFn: () =>
      fetchAccountCrons({
        address: address!,
        page: 1,
        pageSize: 50, // Get more crons per request
      }),
    enabled: isConnected && !!address,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get cron statistics
export const useCronStatistics = () => {
  const fetchCronStats = async () => {
    console.log("Fetching cron statistics...");
    const rpcUrl = getRpcUrl();

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getCronStatistics",
        params: [],
        id: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Failed to fetch cron statistics");
    }

    console.log("Cron statistics fetched:", data.result);
    return data.result;
  };

  return useQuery({
    queryKey: ["cronStatistics"],
    queryFn: fetchCronStats,
    staleTime: 0, // Always consider data stale to force refetch
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false, // Keep this false as per global config
  });
};
