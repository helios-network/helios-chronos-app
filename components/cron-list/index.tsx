"use client";

import { useCrons } from "@/hooks/useCrons";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { useAccount } from "wagmi";
import { Cron, ExecutionStage } from "@/types/cron";
import { formatDistanceToNow } from "date-fns";
import s from "./cron-list.module.scss";

const getExecutionStageLabel = (stage: ExecutionStage): string => {
  switch (stage) {
    case ExecutionStage.PENDING:
      return "Pending";
    case ExecutionStage.EXECUTING:
      return "Executing";
    case ExecutionStage.COMPLETED:
      return "Completed";
    case ExecutionStage.FAILED:
      return "Failed";
    case ExecutionStage.EXPIRED:
      return "Expired";
    default:
      return "Unknown";
  }
};

const getExecutionStageColor = (stage: ExecutionStage): string => {
  switch (stage) {
    case ExecutionStage.PENDING:
      return "#f59e0b";
    case ExecutionStage.EXECUTING:
      return "#3b82f6";
    case ExecutionStage.COMPLETED:
      return "#10b981";
    case ExecutionStage.FAILED:
      return "#ef4444";
    case ExecutionStage.EXPIRED:
      return "#6b7280";
    default:
      return "#6b7280";
  }
};

const CronCard = ({ cron }: { cron: Cron }) => {
  const queueDate = new Date(cron.queueTimestamp * 1000);

  return (
    <Card className={s.cronCard} hover>
      <div className={s.cronHeader}>
        <div className={s.cronId}>
          <span className={s.label}>ID:</span>
          <span className={s.value}>#{cron.id}</span>
        </div>
        <div
          className={s.status}
          style={{
            backgroundColor: getExecutionStageColor(cron.executionStage),
          }}
        >
          {getExecutionStageLabel(cron.executionStage)}
        </div>
      </div>

      <div className={s.cronDetails}>
        <div className={s.detailRow}>
          <span className={s.label}>Contract:</span>
          <span className={s.value} title={cron.contractAddress}>
            {cron.contractAddress.slice(0, 6)}...
            {cron.contractAddress.slice(-4)}
          </span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Method:</span>
          <span className={s.value}>{cron.methodName}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Type:</span>
          <span className={s.value}>{cron.cronType}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Next Execution:</span>
          <span className={s.value}>Block #{cron.nextExecutionBlock}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Expiration:</span>
          <span className={s.value}>Block #{cron.expirationBlock}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Gas Limit:</span>
          <span className={s.value}>{cron.gasLimit.toLocaleString()}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Executions:</span>
          <span className={s.value}>{cron.totalExecutedTransactions}</span>
        </div>

        <div className={s.detailRow}>
          <span className={s.label}>Queued:</span>
          <span className={s.value}>
            {formatDistanceToNow(queueDate, { addSuffix: true })}
          </span>
        </div>

        {cron.totalFeesPaid && (
          <div className={s.detailRow}>
            <span className={s.label}>Fees Paid:</span>
            <span className={s.value}>
              {(parseInt(cron.totalFeesPaid) / 1e18).toFixed(6)} HELIOS
            </span>
          </div>
        )}

        {cron.frequency > 0 && (
          <div className={s.detailRow}>
            <span className={s.label}>Frequency:</span>
            <span className={s.value}>Every {cron.frequency} blocks</span>
          </div>
        )}

        {cron.archived && <div className={s.archivedBadge}>Archived</div>}
      </div>
    </Card>
  );
};

export const CronList = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, error, refetch, isFetching } = useCrons();

  if (!isConnected) {
    return (
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <Heading level={2} size="medium" className={s.sectionHeading}>
            Your Automated Tasks
          </Heading>
          <p className={s.sectionDescription}>
            Manage and monitor your scheduled smart contract executions
          </p>
        </div>
        <Card className={s.emptyState}>
          <Heading level={2} size="medium">
            Connect Your Wallet
          </Heading>
          <p>
            Please connect your wallet to view your automated tasks. Use the
            connect button in the header above.
          </p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <Heading level={2} size="medium" className={s.sectionHeading}>
            Your Automated Tasks
          </Heading>
          <p className={s.sectionDescription}>
            Manage and monitor your scheduled smart contract executions
          </p>
        </div>
        <div className={s.loadingCenter}>
          <div className={s.spinner}></div>
          <p>Loading your crons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <Heading level={2} size="medium" className={s.sectionHeading}>
            Your Automated Tasks
          </Heading>
          <p className={s.sectionDescription}>
            Manage and monitor your scheduled smart contract executions
          </p>
        </div>
        <Card className={s.errorState}>
          <Heading level={2} size="medium">
            Error Loading Crons
          </Heading>
          <p>Failed to load your automated tasks: {error.message}</p>
          <details className={s.errorDetails}>
            <summary>Technical Details</summary>
            <p>
              <strong>Address:</strong> {address}
            </p>
            <p>
              <strong>Error:</strong> {error.message}
            </p>
            <p>This might be due to:</p>
            <ul>
              <li>Network connectivity issues</li>
              <li>RPC server temporarily unavailable</li>
              <li>Invalid wallet address format</li>
              <li>No crons found for this address</li>
            </ul>
          </details>
          <Button onClick={() => refetch()}>Try Again</Button>
        </Card>
      </div>
    );
  }

  const crons = data?.crons || [];

  return (
    <div className={s.container}>
      <div className={s.sectionHeader}>
        <Heading level={2} size="medium" className={s.sectionHeading}>
          Your Automated Tasks
        </Heading>
        <p className={s.sectionDescription}>
          Manage and monitor your scheduled smart contract executions
        </p>
      </div>

      <div className={s.walletStatus}>
        <div className={s.statusInfo}>
          <div className={s.walletBadge}>
            <div className={s.statusDot}></div>
            <span>
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className={s.refreshButton}
        >
          {isFetching ? (
            <>
              <div className={s.buttonSpinner}></div>
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {crons.length === 0 ? (
        <Card className={s.emptyState}>
          <Heading level={2} size="medium">
            No Automated Tasks Found
          </Heading>
          <p>
            You don&apos;t have any automated tasks (crons) set up yet. Create
            your first cron to start automating blockchain interactions.
          </p>
        </Card>
      ) : (
        <div className={s.cronGrid}>
          {crons.map((cron) => (
            <CronCard key={cron.id} cron={cron} />
          ))}
        </div>
      )}
    </div>
  );
};
