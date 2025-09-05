"use client";

import { useState } from "react";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";

import { useCronTransactionReceipts } from "@/hooks/useCrons";
import { CronTransactionReceipt } from "@/types/cron";
import { toast } from "sonner";
import s from "./cron-receipts.module.scss";

interface ReceiptCardProps {
  receipt: CronTransactionReceipt;
}

const ReceiptCard = ({ receipt }: ReceiptCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert hex values to decimal for display
  const blockNumber = parseInt(receipt.blockNumber, 16);
  const gasUsed = parseInt(receipt.gasUsed, 16);
  const cumulativeGasUsed = parseInt(receipt.cumulativeGasUsed, 16);
  const transactionIndex = parseInt(receipt.transactionIndex, 16);
  const isSuccess = receipt.status === "0x1";

  // Format addresses for display
  const formatAddress = (address: string) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Format transaction hash for display
  const formatTxHash = (hash: string) => {
    if (!hash) return "N/A";
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        duration: 2000,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard", {
        duration: 2000,
      });
    }
  };

  return (
    <Card className={`${s.receiptCard} ${isSuccess ? s.success : s.failed}`}>
      <div
        className={s.receiptMainRow}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={s.receiptContent}>
          <div className={s.receiptStatus}>
            <div
              className={`${s.statusIndicator} ${
                isSuccess ? s.statusSuccess : s.statusFailed
              }`}
            >
              {isSuccess ? "✓" : "✗"}
            </div>
            <div className={s.statusText}>
              {isSuccess ? "Success" : "Failed"}
            </div>
          </div>

          <div className={s.cronInfo}>
            <span className={s.cronId}>Cron #{receipt.cronId}</span>
            <span className={s.blockNumber}>
              Block {blockNumber.toLocaleString()}
            </span>
          </div>

          <div className={s.summaryItem}>
            <span className={s.label}>Transaction</span>
            <span
              className={s.value}
              title={`${receipt.transactionHash} (Click to copy)`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(receipt.transactionHash);
              }}
            >
              {formatTxHash(receipt.transactionHash)}
            </span>
          </div>

          <div className={s.summaryItem}>
            <span className={s.label}>From</span>
            <span
              className={s.value}
              title={`${receipt.from} (Click to copy)`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(receipt.from);
              }}
            >
              {formatAddress(receipt.from)}
            </span>
          </div>

          <div className={s.summaryItem}>
            <span className={s.label}>To</span>
            <span
              className={s.value}
              title={`${receipt.to} (Click to copy)`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(receipt.to);
              }}
            >
              {formatAddress(receipt.to)}
            </span>
          </div>

          <div className={s.summaryItem}>
            <span className={s.label}>Gas Used</span>
            <span className={s.value}>{gasUsed.toLocaleString()}</span>
          </div>
        </div>

        <div className={s.expandButton}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${s.expandIcon} ${isExpanded ? s.expanded : ""}`}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className={s.receiptDetails}>
          <div className={s.detailsGrid}>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Cron Address</span>
              <span
                className={s.detailValue}
                title={`${receipt.cronAddress} (Click to copy)`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(receipt.cronAddress);
                }}
              >
                {receipt.cronAddress}
              </span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Contract Address</span>
              <span
                className={s.detailValue}
                title={
                  receipt.contractAddress
                    ? `${receipt.contractAddress} (Click to copy)`
                    : "N/A"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (receipt.contractAddress) {
                    copyToClipboard(receipt.contractAddress);
                  }
                }}
              >
                {receipt.contractAddress || "N/A"}
              </span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Block Hash</span>
              <span
                className={s.detailValue}
                title={`${receipt.blockHash} (Click to copy)`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(receipt.blockHash);
                }}
              >
                {receipt.blockHash}
              </span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Transaction Index</span>
              <span className={s.detailValue}>{transactionIndex}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Cumulative Gas Used</span>
              <span className={s.detailValue}>
                {cumulativeGasUsed.toLocaleString()}
              </span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Type</span>
              <span className={s.detailValue}>{receipt.type}</span>
            </div>
            {receipt.vmError && (
              <div className={s.detailItem}>
                <span className={s.detailLabel}>VM Error</span>
                <span className={s.detailValue}>{receipt.vmError}</span>
              </div>
            )}
            {receipt.logs && receipt.logs.length > 0 && (
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Logs</span>
                <span className={s.detailValue}>
                  {receipt.logs.length} event(s)
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export const CronReceipts = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: receipts,
    isLoading,
    error,
    refetch,
  } = useCronTransactionReceipts("latest");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      // Add a small delay to show the refresh animation
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Heading level={2} size="large" className={s.heading}>
          Latest Cron Transactions
        </Heading>
        <p className={s.description}>
          View the most recent cron transaction receipts and their execution
          details
        </p>
      </div>

      {isLoading && (
        <div className={s.loading}>
          <div className={s.loadingSpinner}></div>
          <p>Loading transaction receipts...</p>
        </div>
      )}

      {error && (
        <div className={s.error}>
          <p>Failed to load transaction receipts: {error.message}</p>
          <Button onClick={handleRefresh} variant="primary" size="small">
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && receipts && (
        <div className={s.receiptsContainer}>
          {receipts.length === 0 ? (
            <div className={s.noReceipts}>
              <p>No cron transaction receipts found for this block.</p>
            </div>
          ) : (
            <>
              <div className={s.receiptsHeader}>
                <span className={s.receiptsCount}>
                  {receipts.length} transaction
                  {receipts.length !== 1 ? "s" : ""} found
                </span>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={s.refreshButton}
                >
                  {isRefreshing ? (
                    <>
                      <div className={s.buttonSpinner}></div>
                      Refreshing...
                    </>
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
              <div className={s.receiptsList}>
                {receipts.map(
                  (receipt: CronTransactionReceipt, index: number) => (
                    <ReceiptCard
                      key={`${receipt.transactionHash}-${index}`}
                      receipt={receipt}
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
