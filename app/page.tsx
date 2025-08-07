"use client";

import { CronList } from "@/components/cron-list";
import { CronReceipts } from "@/components/cron-receipts";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { useCronStatistics } from "@/hooks/useCrons";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const { data: stats, isLoading, error, isFetching } = useCronStatistics();

  // Show loading state only on initial load, not during refetch
  if (isLoading && !stats) {
    return (
      <div className={s.statsContainer}>
        <Heading level={2} size="medium" className={s.statsHeading}>
          Network Statistics
        </Heading>
        <div className={s.statsGrid}>
          <StatsCard
            title="Total Crons"
            value="Loading..."
            description="Active automated tasks"
          />
          <StatsCard
            title="Queue Count"
            value="Loading..."
            description="Tasks waiting execution"
          />
          <StatsCard
            title="Archived"
            value="Loading..."
            description="Completed tasks"
          />
          <StatsCard
            title="Last Block Executions"
            value="Loading..."
            description="Tasks executed recently"
          />
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !stats) {
    return (
      <div className={s.statsContainer}>
        <Heading level={2} size="medium" className={s.statsHeading}>
          Network Statistics
        </Heading>
        <div className={s.statsGrid}>
          <StatsCard
            title="Total Crons"
            value="Error"
            description="Failed to load data"
          />
          <StatsCard
            title="Queue Count"
            value="Error"
            description="Failed to load data"
          />
          <StatsCard
            title="Archived"
            value="Error"
            description="Failed to load data"
          />
          <StatsCard
            title="Last Block Executions"
            value="Error"
            description="Failed to load data"
          />
        </div>
      </div>
    );
  }

  // Show data (or fallback to 0 if no data)
  return (
    <div className={s.statsContainer}>
      <Heading level={2} size="medium" className={s.statsHeading}>
        Network Statistics
      </Heading>
      <div className={s.statsGrid}>
        <StatsCard
          title="Total Crons"
          value={stats?.cronCount?.toLocaleString() || "0"}
          description="Active automated tasks"
        />
        <StatsCard
          title="Queue Count"
          value={stats?.queueCount?.toLocaleString() || "0"}
          description="Tasks waiting execution"
        />
        <StatsCard
          title="Archived"
          value={stats?.archivedCrons?.toLocaleString() || "0"}
          description="Completed tasks"
        />
        <StatsCard
          title="Last Block Executions"
          value={stats?.executedLastBlockCount?.toLocaleString() || "0"}
          description="Tasks executed recently"
        />
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isReloading, setIsReloading] = useState(false);
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const router = useRouter();

  useLayoutEffect(() => {
    // Check if we're coming back from another page by looking at sessionStorage
    const isReturningToHome = sessionStorage.getItem("navigatedFromHome");

    if (isReturningToHome) {
      console.log("Returning to home page - reloading to reset animations");
      sessionStorage.removeItem("navigatedFromHome");

      // Hide page content immediately to prevent flash
      setIsReloading(true);

      // Reload immediately - no delay needed since content is hidden
      window.location.reload();
      return;
    }
  }, []);

  useEffect(() => {
    // Normal page load - invalidate and refetch data
    console.log("HomePage mounted - invalidating queries");

    // Show a subtle toast to indicate data refresh
    toast.loading("Refreshing data...", {
      id: "home-refresh",
      duration: 2000,
    });

    // Invalidate cron statistics
    queryClient.invalidateQueries({ queryKey: ["cronStatistics"] });
    queryClient.refetchQueries({ queryKey: ["cronStatistics"] });

    // Invalidate cron transaction receipts
    queryClient.invalidateQueries({ queryKey: ["cronTransactionReceipts"] });
    queryClient.refetchQueries({ queryKey: ["cronTransactionReceipts"] });

    // Invalidate cron list if user is connected
    if (address) {
      console.log("Invalidating cron list for address:", address);
      queryClient.invalidateQueries({ queryKey: ["crons", address] });
      queryClient.refetchQueries({ queryKey: ["crons", address] });
    }

    // Show success after a short delay
    setTimeout(() => {
      toast.success("Data refreshed!", {
        id: "home-refresh",
        duration: 1500,
      });
    }, 1000);
  }, [queryClient, address, router]);

  // Don't render anything if we're reloading - initial loading screen handles this
  if (isReloading) {
    return null;
  }

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
            <Link
              href="/schedule"
              className={s.scheduleButton}
              onClick={() => {
                // Mark navigation for progress bar
                sessionStorage.setItem("isNavigating", "true");
                // Mark that we're navigating away from home
                sessionStorage.setItem("navigatedFromHome", "true");
              }}
            >
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
            </Link>
          </div>
          <div className={s.decorativeIcon}></div>
          <div className={s.decorativeIconLeft}></div>
        </div>
      </header>

      <div className={s.content}>
        <Card className={s.sectionCard}>
          <CronStatistics />
        </Card>
        <Card className={s.sectionCard}>
          <CronList />
        </Card>
        <Card className={s.sectionCard}>
          <CronReceipts />
        </Card>
      </div>
    </div>
  );
}
