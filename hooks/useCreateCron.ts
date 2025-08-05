import { Feedback } from "@/types/feedback";
import { getErrorMessage } from "@/utils/string";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useWeb3Provider } from "./useWeb3Provider";

// Chronos precompile contract address
const CHRONOS_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000830";

// ABI for the Chronos contract's createCron function
const chronosAbi = [
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
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
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
        internalType: "uint256",
        name: "cronId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
        setFeedback({
          status: "primary",
          message: "Creating cron transaction...",
        });

        // Create web3 contract instance
        const contract = new web3Provider.eth.Contract(
          chronosAbi,
          CHRONOS_CONTRACT_ADDRESS
        );

        // Get current block number to calculate expiration
        const currentBlock = await web3Provider.eth.getBlockNumber();
        console.log("Current block:", currentBlock);

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
        const expirationBlock =
          currentBlock + BigInt(cronParams.expirationBlocks);

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

        // Call first to check if transaction will succeed
        try {
          await contract.methods
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
            .call({
              from: address,
              value: amountToDepositWei,
            });
        } catch (callError) {
          console.error("Call error:", callError);
          throw new Error(
            `Transaction would fail: ${
              getErrorMessage(callError) || "Unknown error"
            }`
          );
        }

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

        setFeedback({
          status: "primary",
          message: `Transaction sent, waiting for confirmation...`,
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
        setFeedback({
          status: "danger",
          message: errorMessage,
        });
        throw error;
      }
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      setFeedback({
        status: "danger",
        message: getErrorMessage(error) || "Error during cron creation",
      });
    },
  });

  const createCron = async (cronParams: CreateCronParams) => {
    try {
      const result = await createCronMutation.mutateAsync(cronParams);

      setFeedback({
        status: "success",
        message: `Cron scheduled successfully! Refreshing data...`,
      });
      console.log("Cron successfully created!");

      // Refetch relevant queries
      await queryClient.refetchQueries({ queryKey: ["crons", address] });
      await queryClient.refetchQueries({ queryKey: ["cronStatistics"] });

      return result;
    } catch (error) {
      // Error is already handled in the mutation
      console.error("Cron creation failed:", error);
      throw error;
    }
  };

  return {
    createCron,
    feedback,
    resetFeedback,
    isLoading: createCronMutation.isPending,
  };
};
