"use client";

import { useCrons } from "@/hooks/useCrons";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { useAccount } from "wagmi";
import { Cron, ExecutionStage } from "@/types/cron";
// removed formatDistanceToNow as 'Queued' row is hidden
import { useCreateCron } from "@/hooks/useCreateCron";
import { useWeb3Provider } from "@/hooks/useWeb3Provider";
import { useEffect, useMemo, useState } from "react";
import s from "./cron-list.module.scss";

const getExecutionStageLabel = (stage: ExecutionStage): string => {
  switch (stage) {
    case ExecutionStage.PENDING:
      return "Pending";
    case ExecutionStage.EXECUTING:
      return "Executing";
    case ExecutionStage.COMPLETED:
      return "Finished";
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
      return "#002DCB";
    case ExecutionStage.COMPLETED:
      return "#10b981";
    case ExecutionStage.FAILED:
      return "#ef4444";
    case ExecutionStage.EXPIRED:
      return "#828DB3";
    default:
      return "#828DB3";
  }
};

const CronCard = ({ cron, selected, onToggleSelect, onEdit }: { cron: Cron; selected: boolean; onToggleSelect: (id: number, checked: boolean) => void; onEdit: (cron: Cron) => void }) => {
  const { cancelCron, isCancelling } = useCreateCron();

  // Derive stage: treat archived as finished
  const derivedStage = cron.archived ? ExecutionStage.COMPLETED : cron.executionStage;

  const handleCancel = async () => {
    const confirmed = window.confirm(`Cancel cron #${cron.id}?`);
    if (!confirmed) return;
    try {
      await cancelCron(cron.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className={s.cronCard} hover>
      <div className={s.cronHeader}>
        <div className={s.cronId}>
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onToggleSelect(cron.id, e.target.checked)}
            className={s.selectCheckbox}
            style={{ marginRight: 8 }}
            disabled={
              cron.archived ||
              cron.executionStage === ExecutionStage.COMPLETED ||
              cron.executionStage === ExecutionStage.EXPIRED
            }
            title={
              cron.archived || cron.executionStage === ExecutionStage.COMPLETED || cron.executionStage === ExecutionStage.EXPIRED
                ? "Cannot select archived or finished crons"
                : undefined
            }
          />
          <span className={s.label}>ID:</span>
          <span className={s.value}>#{cron.id}</span>
        </div>
        <div className={s.headerBadges}>
          {cron.archived && <span className={s.archivedBadge}>Archived</span>}
          <div
            className={s.status}
            style={{
              backgroundColor: getExecutionStageColor(derivedStage),
            }}
          >
            {getExecutionStageLabel(derivedStage)}
          </div>
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


      </div>

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>
          ID #{cron.id}
        </div>
        <div className={s.actions}>
          <Button
            variant="outline"
            size="small"
            onClick={handleCancel}
            disabled={
              isCancelling ||
              cron.archived ||
              cron.executionStage === ExecutionStage.COMPLETED ||
              cron.executionStage === ExecutionStage.EXPIRED
            }
          >
            {isCancelling ? "Cancelling..." : "Cancel"}
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => { }}
            disabled={true}
            title="Editing is temporarily disabled"
          >
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Edit modal (replaces inline form)
const EditCronModal = ({ cron, onClose }: { cron: Cron; onClose: () => void }) => {
  const { updateCron, isUpdating } = useCreateCron();
  const web3 = useWeb3Provider();
  // Pre-fill with existing values
  const [frequency, setFrequency] = useState<number>(cron.frequency || 0);
  const [expirationBlock, setExpirationBlock] = useState<number>(cron.expirationBlock || 0);
  const [gasLimit, setGasLimit] = useState<number>(cron.gasLimit || 0);
  const [maxGasPrice, setMaxGasPrice] = useState<string>(
    (cron.maxGasPrice ? (Number(cron.maxGasPrice) / 1e9).toString() : "10") // gwei
  );
  const [params, setParams] = useState<string>(cron.params?.join(", ") || "");

  // Validation state
  const [errors, setErrors] = useState<string[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!web3) return;
        const bn = await web3.eth.getBlockNumber();
        if (mounted) setCurrentBlock(Number(bn));
      } catch (_) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [web3]);

  const disabled = cron.archived || cron.executionStage === ExecutionStage.COMPLETED || cron.executionStage === ExecutionStage.EXPIRED;

  const validate = (): boolean => {
    const errs: string[] = [];

    // Frequency: >= 0 and reasonable upper bound
    if (frequency < 0) errs.push("Frequency cannot be negative.");
    if (frequency > 10_000_000) errs.push("Frequency is too large.");

    // Gas limit sanity
    if (gasLimit <= 0) errs.push("Gas limit must be greater than 0.");
    if (gasLimit < 100_000) errs.push("Gas limit is very low; try >= 100,000 to avoid contract validation failures.");
    if (gasLimit > 30_000_000) errs.push("Gas limit exceeds typical block gas limit.");

    // Max gas price gwei sanity
    const gwei = Math.floor(Number(maxGasPrice));
    if (!Number.isFinite(gwei) || gwei < 0) errs.push("Max gas price must be a non-negative integer (gwei).");
    if (gwei > 10_000) errs.push("Max gas price seems unreasonably high (gwei).");

    // Expiration block sanity
    if (expirationBlock <= 0) errs.push("Expiration block must be greater than 0.");
    if (currentBlock != null) {
      if (expirationBlock <= currentBlock) {
        errs.push(`Expiration block must be greater than current block (${currentBlock}).`);
      }
      if (expirationBlock - currentBlock > 100_000_000) {
        errs.push("Expiration block is too far in the future.");
      }
    }
    // Should also be greater than the next scheduled execution to avoid invalid state
    if (expirationBlock <= cron.nextExecutionBlock) {
      errs.push(`Expiration block must be greater than next execution block (#${cron.nextExecutionBlock}).`);
    }
    // If periodic, ensure expiration can accommodate at least one next interval
    if ((frequency || 0) > 0 && expirationBlock < cron.nextExecutionBlock + frequency) {
      errs.push(`For periodic crons, expiration should be at least next execution + frequency (>= #${cron.nextExecutionBlock + frequency}).`);
    }

    // Params parsing sanity (simple)
    const newParams = params
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (newParams.length > 50) errs.push("Too many parameters.");

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const newParams = params
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      await updateCron({
        cronId: cron.id,
        newFrequency: Number(frequency || 0),
        newParams,
        newExpirationBlock: Number(expirationBlock || 0),
        newGasLimit: Number(gasLimit || 0),
        newMaxGasPrice: maxGasPrice || "10",
      });

      onClose(); // Close modal on success
    } catch (e) {
      console.error(e);
    }
  };

  // Modal overlay content
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <div className={s.modalHeader}>
          <Heading level={3} size="medium">Edit Cron #{cron.id}</Heading>
          <Button variant="ghost" size="small" onClick={onClose}>Close</Button>
        </div>

        <div className={s.modalInfoBox}>
          <div className={s.infoRow}><span className={s.infoLabel}>Contract</span><span className={s.infoValue} title={cron.contractAddress}>{cron.contractAddress.slice(0, 10)}...{cron.contractAddress.slice(-6)}</span></div>
          <div className={s.infoRow}><span className={s.infoLabel}>Method</span><span className={s.infoValue}>{cron.methodName}</span></div>
          <details className={s.infoAbi}><summary>ABI (read-only)</summary><pre>{cron.abiJson}</pre></details>
        </div>

        {currentBlock != null && (
          <div className={s.modalCurrentBlock}>Current block: {currentBlock}</div>
        )}

        <div className={s.modalRow2}>
          <label className={s.modalLabelColumn}>
            <span className={s.modalLabel}>Frequency (blocks)</span>
            <input type="number" min={0} value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} onBlur={validate} className={s.modalInput} />
          </label>
          <label className={s.modalLabelColumn}>
            <span className={s.modalLabel}>Expiration Block</span>
            <input type="number" min={0} value={expirationBlock} onChange={(e) => setExpirationBlock(Number(e.target.value))} onBlur={validate} className={s.modalInput} />
          </label>
        </div>

        <div className={s.modalRow2}>
          <label className={s.modalLabelColumn}>
            <span className={s.modalLabel}>Gas Limit</span>
            <input type="number" min={0} value={gasLimit} onChange={(e) => setGasLimit(Number(e.target.value))} onBlur={validate} className={s.modalInput} />
          </label>
          <label className={s.modalLabelColumn}>
            <span className={s.modalLabel}>Max Gas Price (gwei)</span>
            <input type="number" min={0} value={maxGasPrice} onChange={(e) => setMaxGasPrice(e.target.value)} onBlur={validate} className={s.modalInput} />
          </label>
        </div>

        <label className={s.modalLabelColumn}>
          <span className={s.modalLabel}>Params (comma-separated)</span>
          <input type="text" value={params} onChange={(e) => setParams(e.target.value)} onBlur={validate} placeholder="param1, param2, param3" className={s.modalInput} />
        </label>

        {errors.length > 0 && (
          <ul className={s.modalErrors}>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <div className={s.modalFooter}>
          <Button variant="ghost" size="small" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="small" onClick={handleSave} disabled={isUpdating || errors.length > 0}>
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CronList = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, error, refetch, isFetching } = useCrons();

  // Hooks must be declared before any conditional returns
  const crons = data?.crons || [];
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { cancelCron, isCancelling } = useCreateCron();
  const allSelectableIds = useMemo(
    () => crons.filter((c) => !c.archived && c.executionStage !== ExecutionStage.COMPLETED && c.executionStage !== ExecutionStage.EXPIRED).map((c) => c.id),
    [crons]
  );
  const onToggleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(() => (checked ? new Set(allSelectableIds) : new Set()));
  };
  const bulkCancel = async () => {
    if (selectedIds.size === 0) return;
    // Sequential to avoid nonce races; can be parallel if provider handles it
    for (const id of Array.from(selectedIds)) {
      try { await cancelCron(id); } catch (e) { console.error("Bulk cancel failed for id", id, e); }
    }
    setSelectedIds(new Set());
  };
  const [editing, setEditing] = useState<null | Cron>(null);

  if (!isConnected) {
    return (
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <Heading level={2} size="large" className={s.sectionHeading}>
            Your Automated Tasks
          </Heading>
          <p className={s.sectionDescription}>
            Manage and monitor your scheduled smart contract executions
          </p>
        </div>
        <Card className={s.emptyState}>
          <div className={s.walletIcon}>
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path
                d="M19 7h-1V6a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3zm-1 9a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <Heading level={2} size="medium" className={s.emptyStateTitle}>
            Wallet Connection Required
          </Heading>
          <p className={s.emptyStateMessage}>
            Connect your wallet to view and manage your automated blockchain
            tasks. Your crons will appear here once connected.
          </p>
          <div className={s.connectInstructions}>
            <div className={s.instructionStep}>
              <div className={s.stepNumber}>1</div>
              <span>
                Click the &quot;Connect Wallet&quot; button in the top
                navigation
              </span>
            </div>
            <div className={s.instructionStep}>
              <div className={s.stepNumber}>2</div>
              <span>Select your preferred wallet provider</span>
            </div>
            <div className={s.instructionStep}>
              <div className={s.stepNumber}>3</div>
              <span>Authorize the connection to view your crons</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <Heading level={2} size="large" className={s.sectionHeading}>
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
          <Heading level={2} size="large" className={s.sectionHeading}>
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



  return (
    <div className={s.container}>
      <div className={s.sectionHeader}>
        <Heading level={2} size="large" className={s.sectionHeading}>
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
        <div className={s.actions}>
          <label className={s.selectAll}>
            <input
              type="checkbox"
              className={s.selectCheckbox}
              checked={selectedIds.size > 0 && selectedIds.size === allSelectableIds.length}
              onChange={(e) => toggleSelectAll(e.target.checked)}
            />
            <span className={s.selectAllText}>Select all</span>
          </label>
          <Button
            variant="outline"
            onClick={bulkCancel}
            disabled={selectedIds.size === 0 || isCancelling}
            className={s.refreshButton}
            title={selectedIds.size ? `Cancel ${selectedIds.size} selected cron(s)` : undefined}
          >
            {isCancelling ? "Cancelling..." : `Cancel crons (${selectedIds.size})`}
          </Button>
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
      </div>

      {crons.length === 0 ? (
        <Card className={s.emptyState}>
          <div className={s.emptyIcon}>
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          </div>
          <Heading level={2} size="medium" className={s.emptyStateTitle}>
            No Automated Tasks Found
          </Heading>
          <p className={s.emptyStateMessage}>
            You don&apos;t have any automated tasks (crons) set up yet. Create
            your first cron to start automating blockchain interactions.
          </p>
        </Card>
      ) : (
        <>
          {/* Bulk bar above grid if selection exists */}
          {selectedIds.size > 0 && (
            <div className={s.bulkBar}>
              <div className={s.selectedCount}>{selectedIds.size} selected</div>
              <Button variant="outline" onClick={() => setSelectedIds(new Set())}>
                Cancel selection
              </Button>
            </div>
          )}

          <div className={s.cronGrid}>
            {crons.map((cron) => (
              <CronCard
                key={cron.id}
                cron={cron}
                selected={selectedIds.has(cron.id)}
                onToggleSelect={onToggleSelect}
                onEdit={(c) => setEditing(c)}
              />
            ))}
          </div>
        </>
      )}

      {/* Edit modal */}
      {editing && (
        <EditCronModal cron={editing} onClose={() => setEditing(null)} />)
      }
    </div>
  );
};
