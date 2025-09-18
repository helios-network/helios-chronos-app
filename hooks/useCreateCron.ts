import { Feedback } from "@/types/feedback";
import { getErrorMessage } from "@/utils/string";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useWeb3Provider } from "./useWeb3Provider";
import { toast } from "sonner";

// Chronos precompile contract address
const CHRONOS_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000830";

// Complete ABI for the Chronos contract
const chronosAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "cronId",
        type: "uint64",
      },
    ],
    name: "CronCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "cronId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "CronModified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "cronId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "CronCancelled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "abi",
        type: "string",
      },
      {
        internalType: "string",
        name: "methodName",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "params",
        type: "string[]",
      },
      {
        internalType: "uint64",
        name: "frequency",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "expirationBlock",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "gasLimit",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "maxGasPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
    ],
    name: "createCron",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "methodName",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "expirationBlock",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "gasLimit",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "maxGasPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
    ],
    name: "createCallbackConditionedCron",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cronId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newFrequency",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "newParams",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "newExpirationBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newGasLimit",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "newMaxGasPrice",
        type: "uint64",
      },
    ],
    name: "updateCron",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "cronId",
        type: "uint64",
      },
    ],
    name: "cancelCron",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export interface CreateCronParams {
  contractAddress: string;
  abi: string;
  methodName: string;
  params: string[];
  frequency: number;
  expirationBlocks: number;
  gasLimit: number;
  maxGasPrice: string;
  amountToDeposit: string;
}

export const useCreateCron = () => {
  const { address } = useAccount();
  const web3Provider = useWeb3Provider();
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState<Feedback>({
    status: "primary",
    message: "",
  });

  const resetFeedback = () => {
    setFeedback({ status: "primary", message: "" });
  };

  const createCronMutation = useMutation({
    mutationFn: async (cronParams: CreateCronParams) => {
      if (!web3Provider) throw new Error("No wallet connected");
      if (!address) throw new Error("No wallet address available");

      try {
        console.log("Cron creation in progress...");
        // Ensure previous toast state is cleared to avoid stale descriptions
        toast.dismiss("cron-creation");
        toast.loading("Preparing cron transaction...", {
          id: "cron-creation",
          description: undefined,
        });

        // Create web3 contract instance
        const contract = new web3Provider.eth.Contract(
          chronosAbi,
          CHRONOS_CONTRACT_ADDRESS
        );

        // Get current block number with retry logic
        let currentBlock;
        let retries = 3;
        while (retries > 0) {
          try {
            currentBlock = await web3Provider.eth.getBlockNumber();
            console.log("Current block:", currentBlock);
            break;
          } catch (blockError) {
            console.warn(
              `Failed to get block number, retries left: ${retries - 1}`
            );
            retries--;
            if (retries === 0) {
              throw new Error(
                "Failed to get current block number after retries"
              );
            }
            // Wait 1 second before retry
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        // Convert parameters to the right format
        const maxGasPriceWei = web3Provider.utils.toWei(
          cronParams.maxGasPrice,
          "gwei"
        );
        const amountToDepositWei = web3Provider.utils.toWei(
          cronParams.amountToDeposit,
          "ether"
        );

        // Ensure all numeric values are properly converted to avoid BigInt mixing issues
        const frequency = BigInt(cronParams.frequency);
        const gasLimit = BigInt(cronParams.gasLimit);
        // Add a small buffer to avoid edge cases with block synchronization
        if (currentBlock === undefined) {
          throw new Error("Current block number is undefined");
        }
        const expirationBlock =
          currentBlock + BigInt(cronParams.expirationBlocks) + BigInt(10);

        // Verify contract exists
        const targetContractCode = await web3Provider.eth.getCode(
          cronParams.contractAddress
        );
        if (targetContractCode === "0x") {
          throw new Error(
            `Target contract at ${cronParams.contractAddress} does not exist or has no code`
          );
        }

        console.log("Target contract exists, proceeding with createCron...");
        console.log("Parameters:", {
          contractAddress: cronParams.contractAddress,
          methodName: cronParams.methodName,
          frequency: frequency.toString(),
          expirationBlock: expirationBlock.toString(),
          gasLimit: gasLimit.toString(),
          maxGasPrice: maxGasPriceWei,
          amountToDeposit: amountToDepositWei,
        });

        toast.loading("Sending transaction to blockchain...", {
          id: "cron-creation",
          description: undefined,
        });

        // Send the transaction
        const tx = await contract.methods
          .createCron(
            cronParams.contractAddress,
            cronParams.abi,
            cronParams.methodName,
            cronParams.params,
            frequency,
            expirationBlock,
            gasLimit,
            maxGasPriceWei,
            amountToDepositWei
          )
          .send({
            from: address,
            value: amountToDepositWei,
            gasPrice: web3Provider.utils.toWei("20", "gwei"),
            gas: "2000000",
          });

        console.log("Transaction sent, hash:", tx.transactionHash);

        toast.loading(`Transaction sent! Waiting for confirmation...`, {
          id: "cron-creation",
          description: `Hash: ${tx.transactionHash.slice(0, 10)}...`,
        });

        // Wait for transaction receipt
        const receipt = await web3Provider.eth.getTransactionReceipt(
          tx.transactionHash
        );
        console.log("Transaction confirmed in block:", receipt.blockNumber);

        // Extract cron ID from transaction logs if available
        let cronId = null;
        if (receipt.logs && receipt.logs.length > 0) {
          // You might need to decode the logs to get the actual cron ID
          console.log("Transaction logs:", receipt.logs);
          // For now, we'll just return the transaction hash
        }

        return {
          receipt,
          cronId,
          transactionHash: tx.transactionHash,
        };
      } catch (error: any) {
        console.error("Error during cron creation:", error);
        const errorMessage =
          getErrorMessage(error) || "Error during cron creation";
        toast.error("Failed to create cron", {
          id: "cron-creation",
          description: errorMessage,
        });
        throw error;
      }
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast.error("Failed to create cron", {
        id: "cron-creation",
        description: getErrorMessage(error) || "Error during cron creation",
      });
    },
  });

  const createCron = async (cronParams: CreateCronParams) => {
    try {
      const result = await createCronMutation.mutateAsync(cronParams);

      // Mark feedback as success for consumers
      setFeedback({ status: "success", message: "Cron scheduled successfully!" });

      toast.success("Cron scheduled successfully!", {
        id: "cron-creation",
        description: "Your automated task has been created and is now active",
      });
      console.log("Cron successfully created!");

      // Show loading toast for data refresh
      toast.loading("Refreshing cron data...", {
        id: "cron-refresh",
      });

      // Refetch relevant queries
      await queryClient.refetchQueries({ queryKey: ["crons", address] });
      await queryClient.refetchQueries({ queryKey: ["cronStatistics"] });

      toast.success("Data refreshed!", {
        id: "cron-refresh",
      });

      return result;
    } catch (error) {
      // Surface failure through feedback as well
      setFeedback({
        status: "danger",
        message: getErrorMessage(error) || "Error during cron creation",
      });
      console.error("Cron creation failed:", error);
      throw error;
    }
  };

  // Cancel cron mutation
  const cancelCronMutation = useMutation({
    mutationFn: async (cronId: number | string | bigint) => {
      if (!web3Provider) throw new Error("No wallet connected");
      if (!address) throw new Error("No wallet address available");

      try {
        // Reset previous toast state for this cron id
        toast.loading("Cancelling cron...", { id: `cron-cancel-${cronId}`, description: undefined });
        // Give the UI a chance to render the toast before wallet prompt
        await new Promise((resolve) => setTimeout(resolve, 50));

        const contract = new web3Provider.eth.Contract(
          chronosAbi,
          CHRONOS_CONTRACT_ADDRESS
        );

        const tx = await contract.methods.cancelCron(cronId).send({
          from: address,
          gasPrice: web3Provider.utils.toWei("20", "gwei"),
          gas: "500000",
        });

        toast.loading(`Transaction sent! Waiting for confirmation...`, {
          id: `cron-cancel-${cronId}`,
          description: `Hash: ${tx.transactionHash.slice(0, 10)}...`,
        });

        return { transactionHash: tx.transactionHash };
      } catch (error) {
        toast.error("Failed to cancel cron", {
          id: `cron-cancel-${cronId}`,
          description: getErrorMessage(error) || "Error during cron cancellation",
        });
        throw error;
      }
    },
  });

  const cancelCron = async (cronId: number) => {
    try {
      const idLike = BigInt(cronId);
      const result = await cancelCronMutation.mutateAsync(idLike);

      toast.success("Cron cancelled successfully!", {
        id: `cron-cancel-${cronId}`,
      });

      // Refresh lists and statistics
      await queryClient.refetchQueries({ queryKey: ["crons", address] });
      await queryClient.refetchQueries({ queryKey: ["cronStatistics"] });

      return result;
    } catch (error) {
      // Error already handled
      console.error("Cron cancellation failed:", error);
      throw error;
    }
  };

  // Update cron mutation
  interface UpdateCronParams {
    cronId: number;
    newFrequency: number; // blocks
    newParams: string[]; // string-encoded params
    newExpirationBlock: number; // absolute block
    newGasLimit: number;
    newMaxGasPrice: string; // in gwei
  }

  const updateCronMutation = useMutation({
    mutationFn: async (p: UpdateCronParams) => {
      if (!web3Provider) throw new Error("No wallet connected");
      if (!address) throw new Error("No wallet address available");

      try {
        // Reset previous toast state for this cron id
        toast.dismiss(`cron-update-${p.cronId}`);
        toast.loading("Updating cron...", { id: `cron-update-${p.cronId}`, description: undefined });

        const contract = new web3Provider.eth.Contract(
          chronosAbi,
          CHRONOS_CONTRACT_ADDRESS
        );

        // Convert inputs to decimal strings to avoid JS BigInt/number mixing
        const cronId = BigInt(p.cronId).toString();
        const newFrequency = BigInt(p.newFrequency).toString();
        const newExpirationBlock = BigInt(p.newExpirationBlock).toString();
        const newGasLimit = BigInt(p.newGasLimit).toString();
        // updateCron expects max gas price in gwei (uint64), not wei; sanitize decimals
        const parsedMaxGwei = Math.max(0, Math.floor(Number(p.newMaxGasPrice)));
        if (!Number.isFinite(parsedMaxGwei)) {
          throw new Error("Invalid max gas price (gwei)");
        }
        const newMaxGasPrice = BigInt(parsedMaxGwei).toString();

        // Prepare args (all as strings where applicable)
        const args = [
          cronId,
          newFrequency,
          p.newParams,
          newExpirationBlock,
          newGasLimit,
          newMaxGasPrice,
        ] as const;

        // Dry-run to surface reverts before sending
        try {
          await contract.methods.updateCron(...args).call({ from: address });
        } catch (callErr) {
          throw callErr;
        }

        // Estimate gas with buffer
        let gas = "2000000"; // fallback
        try {
          const est = await contract.methods
            .updateCron(...args)
            .estimateGas({ from: address });
          gas = Math.ceil(Number(est) * 1.25).toString(); // 25% buffer
        } catch (e) {
          // if estimation fails, proceed with fallback
          console.warn("Gas estimation failed, using fallback 2,000,000", e);
        }

        const tx = await contract.methods
          .updateCron(...args)
          .send({
            from: address,
            gasPrice: web3Provider.utils.toWei("20", "gwei"),
            gas,
          });

        toast.loading(`Transaction sent! Waiting for confirmation...`, {
          id: `cron-update-${p.cronId}`,
          description: `Hash: ${tx.transactionHash.slice(0, 10)}...`,
        });

        return { transactionHash: tx.transactionHash };
      } catch (error) {
        toast.error("Failed to update cron", {
          id: `cron-update-${p.cronId}`,
          description: getErrorMessage(error) || "Error during cron update",
        });
        throw error;
      }
    },
  });

  const updateCron = async (params: UpdateCronParams) => {
    console.log("updateCron", params)
    try {
      const result = await updateCronMutation.mutateAsync(params);

      toast.success("Cron updated successfully!", {
        id: `cron-update-${params.cronId}`,
      });

      await queryClient.refetchQueries({ queryKey: ["crons", address] });
      await queryClient.refetchQueries({ queryKey: ["cronStatistics"] });

      return result;
    } catch (error) {
      console.error("Cron update failed:", error);
      throw error;
    }
  };

  return {
    createCron,
    cancelCron,
    updateCron,
    feedback,
    resetFeedback,
    isLoading: createCronMutation.isPending,
    isCancelling: cancelCronMutation.isPending,
    isUpdating: updateCronMutation.isPending,
  };
};
