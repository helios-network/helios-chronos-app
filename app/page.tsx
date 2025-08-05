"use client";

import { CronList } from "@/components/cron-list";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { useCronStatistics } from "@/hooks/useCrons";
import s from "./page.module.scss";
import Image from "next/image";

const HeliosIcon = () => (
  <Image
    src="/favicon.png"
    alt="Helios"
    className={s.heliosIcon}
    width={20}
    height={20}
  />
);

const StatsCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description: string;
}) => (
  <Card className={s.statsCard}>
    <div className={s.statsValue}>{value}</div>
    <div className={s.statsTitle}>{title}</div>
    <div className={s.statsDescription}>{description}</div>
  </Card>
);

const CronStatistics = () => {
  const { data: stats, isLoading, error } = useCronStatistics();

  if (isLoading || error || !stats) {
    return null;
  }

  return (
    <div className={s.statsContainer}>
      <Heading level={2} size="medium" className={s.statsHeading}>
        Network Statistics
      </Heading>
      <div className={s.statsGrid}>
        <StatsCard
          title="Total Crons"
          value={stats.cronCount?.toLocaleString() || "0"}
          description="Active automated tasks"
        />
        <StatsCard
          title="Queue Count"
          value={stats.queueCount?.toLocaleString() || "0"}
          description="Tasks waiting execution"
        />
        <StatsCard
          title="Archived"
          value={stats.archivedCrons?.toLocaleString() || "0"}
          description="Completed tasks"
        />
        <StatsCard
          title="Last Block Executions"
          value={stats.executedLastBlockCount?.toLocaleString() || "0"}
          description="Tasks executed recently"
        />
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className={s.container}>
      <header className={s.pageHeader}>
        <div className={s.headerContent}>
          <div className={s.titleSection}>
            <Heading level={1} size="xlarge" className={s.title}>
              Chronos
            </Heading>
            <div className={s.heliosBadge}>
              <HeliosIcon />
              <span>Powered by Helios</span>
            </div>
          </div>
          <p className={s.subtitle}>
            Automated Task Scheduler for Helios Blockchain. Schedule smart
            contract executions with precision and reliability.
          </p>
          <div className={s.actions}>
            <a href="/schedule" className={s.scheduleButton}>
              <svg
                className={s.scheduleIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"
                  fill="currentColor"
                />
              </svg>
              Schedule a Task
            </a>
          </div>
          <div className={s.decorativeIcon}></div>
          <div className={s.decorativeIconLeft}></div>
        </div>
      </header>

      <div className={s.content}>
        <CronStatistics />
        <CronList />
      </div>
    </div>
  );
}
