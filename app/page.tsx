"use client";

import { CronList } from "@/components/cron-list";
import { CronReceipts } from "@/components/cron-receipts";
import { Card } from "@/components/card";
import { useCronStatistics } from "@/hooks/useCrons";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppKit } from "@reown/appkit/react";

const HeroSection = () => (
  <section className={s.heroSection}>
    <div className={s.heroBackground}>
      <Image
        src="/img/abst51.png"
        alt="Abstract background"
        fill
        className={s.abstractImage}
        priority
      />
    </div>
    <div className={s.heroContent}>
      <div className={s.badge}>
        <Image
          src="/img/Group 9.svg"
          alt="Redefining on-chain scheduling"
          width={22}
          height={22}
        />
        <span>Redefining on-chain scheduling</span>
      </div>

      <div className={s.heroText}>
        <h1 className={s.heroTitle}>
          Automated task scheduler for Helios blockchain.
        </h1>
        <p className={s.heroSubtitle}>
          Let&apos;s unlock reliable, secure smart‑contract automation
          <br />
          Our audited scheduler executes your EVM tasks on time—transparent,
          immutable, and cost‑efficient.
        </p>
      </div>

      <Link href="/schedule" className={s.scheduleButton}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99023 20.8823H5.99023C4.92937 20.8823 3.91195 20.4609 3.16181 19.7108C2.41166 18.9606 1.99023 17.9432 1.99023 16.8823V7.88232C1.99023 6.82146 2.41166 5.80404 3.16181 5.0539C3.91195 4.30375 4.92937 3.88232 5.99023 3.88232H16.9902C18.0511 3.88232 19.0685 4.30375 19.8187 5.0539C20.5688 5.80404 20.9902 6.82146 20.9902 7.88232V10.8823M7.99023 2.88232V4.88232M14.9902 2.88232V4.88232M1.99023 8.88232H20.9902M18.4902 16.5253L16.9902 18.0253"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9902 22.8823C19.7517 22.8823 21.9902 20.6437 21.9902 17.8823C21.9902 15.1209 19.7517 12.8823 16.9902 12.8823C14.2288 12.8823 11.9902 15.1209 11.9902 17.8823C11.9902 20.6437 14.2288 22.8823 16.9902 22.8823Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Schedule a Task
      </Link>
    </div>
  </section>
);

const AutomatedTasksSection = () => {
  const { address } = useAccount();
  const { open: openConnectModal } = useAppKit();

  if (address) {
    return null; // Hide this section when wallet is connected
  }

  return (
    <section className={s.automatedTasksSection}>
      <div className={s.automatedTasksContent}>
        <h2 className={s.automatedTasksTitle}>Your Automated Tasks</h2>

        <div className={s.walletPrompt}>
          <div className={s.walletIcon}>
            <svg
              width="45"
              height="44"
              viewBox="0 0 45 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.526 36.9757C12.55 41.76 18.532 39.8459 20.926 37.9078C22.162 36.9057 22.72 36.2577 23.198 35.7777C24.872 34.2236 24.766 32.6675 23.678 31.4235C23.24 30.9254 20.446 28.2413 17.766 25.4892C16.378 24.1011 15.422 23.1211 14.602 22.329C13.508 21.237 12.55 19.9849 11.114 20.0209C9.798 20.0209 8.842 21.181 7.644 22.379C6.268 23.7551 5.252 25.4892 4.894 27.0453C3.816 31.5915 5.492 34.8216 7.526 36.9757ZM7.526 36.9757L2.5 42L7.526 36.9757ZM37.474 7.03025C32.448 2.24201 26.486 4.19011 24.094 6.13021C22.854 7.13426 22.298 7.78229 21.818 8.26231C20.144 9.81839 20.25 11.3745 21.34 12.6185C21.496 12.7985 21.96 13.2586 22.61 13.9066M37.474 7.03025C39.508 9.18436 41.206 12.4505 40.128 17.0007C39.768 18.5568 38.752 20.2909 37.376 21.669C36.18 22.865 35.222 24.0271 33.906 24.0271C32.47 24.0631 31.726 23.0231 30.628 21.931M37.474 7.03025L42.5 2L37.474 7.03025ZM22.61 13.9066C23.772 15.0567 25.536 16.7907 27.252 18.5548C28.64 19.9429 29.808 21.139 30.628 21.929L27.504 24.9791M22.61 13.9066L19.524 17.0107"
                fill="#002DCB"
              />
              <path
                d="M7.526 36.9757C12.55 41.76 18.532 39.8459 20.926 37.9078C22.162 36.9057 22.72 36.2577 23.198 35.7777C24.872 34.2236 24.766 32.6675 23.678 31.4235C23.24 30.9254 20.446 28.2413 17.766 25.4892C16.378 24.1011 15.422 23.1211 14.602 22.329C13.508 21.237 12.55 19.9849 11.114 20.0209C9.798 20.0209 8.842 21.181 7.644 22.379C6.268 23.7551 5.252 25.4892 4.894 27.0453C3.816 31.5915 5.492 34.8216 7.526 36.9757ZM7.526 36.9757L2.5 42M37.474 7.03025C32.448 2.24201 26.486 4.19011 24.094 6.13021C22.854 7.13426 22.298 7.78229 21.818 8.26231C20.144 9.81839 20.25 11.3745 21.34 12.6185C21.496 12.7985 21.96 13.2586 22.61 13.9066M37.474 7.03025C39.508 9.18436 41.206 12.4505 40.128 17.0007C39.768 18.5568 38.752 20.2909 37.376 21.669C36.18 22.865 35.222 24.0271 33.906 24.0271C32.47 24.0631 31.726 23.0231 30.628 21.931M37.474 7.03025L42.5 2M22.61 13.9066C23.772 15.0567 25.536 16.7907 27.252 18.5548C28.64 19.9429 29.808 21.139 30.628 21.929L27.504 24.9791M22.61 13.9066L19.524 17.0107"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className={s.walletPromptText}>
            <h3 className={s.walletPromptTitle}>Wallet connection required</h3>
            <p className={s.walletPromptSubtitle}>
              Connect securely to create and manage your schedule on-chain
              tasks.
            </p>
          </div>

          <button
            className={s.connectWalletButton}
            onClick={() => openConnectModal()}
          >
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.92665 36.2844C11.8513 40.9741 17.7151 39.0978 20.0618 37.198C21.2733 36.2158 21.8203 35.5806 22.2889 35.11C23.9298 33.5867 23.8259 32.0613 22.7594 30.8419C22.33 30.3537 19.5913 27.7226 16.9642 25.0249C15.6037 23.6642 14.6666 22.7036 13.8628 21.9272C12.7904 20.8567 11.8513 19.6294 10.4437 19.6647C9.15374 19.6647 8.21664 20.8018 7.04232 21.9762C5.69352 23.3251 4.6976 25.0249 4.34668 26.5502C3.28999 31.0066 4.93286 34.1729 6.92665 36.2844ZM6.92665 36.2844L2 41.2093M36.2827 6.93082C31.356 2.23723 25.5119 4.14682 23.1672 6.04857C21.9517 7.03277 21.4067 7.66799 20.9361 8.13853C19.2952 9.66385 19.3991 11.1892 20.4676 12.4086C20.6205 12.5851 21.0753 13.036 21.7125 13.6712M36.2827 6.93082C38.2765 9.04235 39.9409 12.244 38.8842 16.7042C38.5313 18.2296 37.5354 19.9294 36.1866 21.2802C35.0143 22.4526 34.0752 23.5917 32.7852 23.5917C31.3776 23.627 30.6483 22.6075 29.572 21.537M36.2827 6.93082L41.2093 2M21.7125 13.6712C22.8515 14.7986 24.5807 16.4984 26.2627 18.2276C27.6233 19.5882 28.7682 20.7606 29.572 21.5351L26.5098 24.5249M21.7125 13.6712L18.6875 16.714"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Connect Wallet
          </button>

          <p className={s.secureConnection}>Secure connection ~ 30 sec</p>
        </div>
      </div>
    </section>
  );
};

const StatsCard = ({
  title,
  value,
  description,
  iconSrc,
}: {
  title: string;
  value: number | string;
  description: string;
  iconSrc: string;
}) => (
  <div className={s.statsCard}>
    <div className={s.statsCardBackground}>
      <Image src={iconSrc} alt={title} fill className={s.statsCardIcon} />
    </div>
    <div className={s.statsCardContent}>
      <div className={s.statsValue}>{value}</div>
      <div className={s.statsTitle}>{title}</div>
      <div className={s.statsDescription}>{description}</div>
    </div>
  </div>
);

const NetworkStatisticsSection = () => {
  const { data: stats, isLoading, error } = useCronStatistics();

  return (
    <section className={s.networkStatsSection}>
      <div className={s.networkStatsContent}>
        <div className={s.networkStatsContainer}>
          <h2 className={s.networkStatsTitle}>Network Statistics</h2>
          <div className={s.statsGrid}>
            <StatsCard
              title="Total CRONS"
              value={
                isLoading
                  ? "..."
                  : error
                  ? "Error"
                  : stats?.cronCount?.toLocaleString() || "1226"
              }
              description="Active automated tasks"
              iconSrc="/img/card1.svg"
            />
            <StatsCard
              title="Queue Count"
              value={
                isLoading
                  ? "..."
                  : error
                  ? "Error"
                  : stats?.queueCount?.toLocaleString() || "17"
              }
              description="Task waiting execution"
              iconSrc="/img/card2.svg"
            />
            <StatsCard
              title="Archived"
              value={
                isLoading
                  ? "..."
                  : error
                  ? "Error"
                  : stats?.archivedCrons?.toLocaleString() || "4845"
              }
              description="Task completed"
              iconSrc="/img/card3.png"
            />
            <StatsCard
              title="Last block execution"
              value={
                isLoading
                  ? "..."
                  : error
                  ? "Error"
                  : stats?.executedLastBlockCount?.toLocaleString() || "17"
              }
              description="Task executed recently"
              iconSrc="/img/card4.svg"
            />
          </div>
        </div>
      </div>
    </section>
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
      <HeroSection />
      <NetworkStatisticsSection />
      <AutomatedTasksSection />

      {/* Show existing content only when wallet is connected */}
      {address && (
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <Card className={s.sectionCard}>
              <CronList />
            </Card>
            <Card className={s.sectionCard}>
              <CronReceipts />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
