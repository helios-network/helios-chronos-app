"use client";

import { CronScheduler } from "@/components/cron-scheduler";
import { Heading } from "@/components/heading";
import { useAccount } from "wagmi";
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt";
import s from "./page.module.scss";

export default function SchedulePage() {
  const { isConnected } = useAccount();

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Heading level={1} size="large" className={s.title}>
          Schedule Autonomous Tasks
        </Heading>
        <p className={s.subtitle}>
          Create automated tasks that execute on a schedule without requiring
          manual intervention.
        </p>
      </header>

      <div className={s.content}>
        {isConnected ? (
          <CronScheduler />
        ) : (
          <ConnectWalletPrompt message="Connect your wallet to schedule autonomous tasks" />
        )}
      </div>
    </div>
  );
}
