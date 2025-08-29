"use client";

import { Button } from "@/components/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import s from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ChronosLogo = () => (
  <div className={s.chronosLogo}>
    <Image
      src="/img/Chronos Logo.svg"
      alt="Chronos"
      width={241}
      height={65}
      className={s.chronosIcon}
    />
  </div>
);

const ConnectWallet = () => {
  const { open: openLoginModal, close: closeLoginModal } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [wasConnected, setWasConnected] = useState(false);

  useEffect(() => {
    if (isConnected && !wasConnected) {
      setWasConnected(true);
    }
    if (!isConnected) {
      setWasConnected(false);
    }
  }, [isConnected, wasConnected]);

  const handleConnect = async () => {
    await openLoginModal();
  };

  const handleLogout = async () => {
    await closeLoginModal();
    disconnect();
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!address) {
    return (
      <button className={s.connectWalletButton} onClick={handleConnect}>
        <svg
          className={s.walletIcon}
          viewBox="0 0 23 23"
          width="22"
          height="22"
          fill="none"
        >
          <path
            d="M18 19.3964H4C3.46957 19.3964 2.96086 19.1857 2.58579 18.8106C2.21071 18.4356 2 17.9269 2 17.3964V8.39642C2 7.86599 2.21071 7.35728 2.58579 6.98221C2.96086 6.60714 3.46957 6.39642 4 6.39642H18C18.5304 6.39642 19.0391 6.60714 19.4142 6.98221C19.7893 7.35728 20 7.86599 20 8.39642V17.3964C20 17.9269 19.7893 18.4356 19.4142 18.8106C19.0391 19.1857 18.5304 19.3964 18 19.3964Z"
            stroke="#E2EBFF"
            strokeWidth="1.5"
          />
          <path
            d="M15.5 13.3964C15.3674 13.3964 15.2402 13.3437 15.1464 13.25C15.0527 13.1562 15 13.029 15 12.8964C15 12.7638 15.0527 12.6366 15.1464 12.5429C15.2402 12.4491 15.3674 12.3964 15.5 12.3964C15.6326 12.3964 15.7598 12.4491 15.8536 12.5429C15.9473 12.6366 16 12.7638 16 12.8964C16 13.029 15.9473 13.1562 15.8536 13.25C15.7598 13.3437 15.6326 13.3964 15.5 13.3964Z"
            fill="#E2EBFF"
            stroke="#E2EBFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 6.39644V4.99944C16.9999 4.69295 16.9294 4.39057 16.7939 4.11566C16.6583 3.84075 16.4614 3.60067 16.2184 3.41396C15.9753 3.22724 15.6926 3.09888 15.3921 3.0388C15.0915 2.97872 14.7812 2.98852 14.485 3.06744L3.485 6.00044C3.05905 6.11395 2.68254 6.365 2.41399 6.71457C2.14544 7.06414 1.9999 7.49263 2 7.93344V8.39644"
            stroke="#E2EBFF"
            strokeWidth="1.5"
          />
        </svg>
        <span>Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className={s.walletConnected}>
      <div className={s.addressWrapper}>
        <div className={s.addressDot}></div>
        <span className={s.address}>{truncateAddress(address)}</span>
      </div>
      <Button
        variant="outline"
        onClick={handleLogout}
        className={s.logoutButton}
      >
        <svg
          className={s.logoutIcon}
          viewBox="0 0 24 24"
          width="14"
          height="14"
        >
          <path
            d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"
            fill="currentColor"
          />
        </svg>
        <span>Disconnect</span>
      </Button>
    </div>
  );
};

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={s.header}>
      <div className={s.headerBackground}></div>
      <div className={s.headerContent}>
        <Link
          href="/"
          className={s.logoSection}
          onClick={() => {
            sessionStorage.setItem("isNavigating", "true");
            if (pathname !== "/") {
              sessionStorage.setItem("navigatedFromHome", "true");
            }
          }}
        >
          <ChronosLogo />
        </Link>

        <div className={s.navigation}>
          <div className={s.navContainer}>
            <Link
              href="/"
              className={`${s.navItem} ${
                pathname === "/" ? s.navItemActive : ""
              }`}
              onClick={() => {
                sessionStorage.setItem("isNavigating", "true");
                if (pathname !== "/") {
                  sessionStorage.setItem("navigatedFromHome", "true");
                }
              }}
            >
              Home
            </Link>
            <Link
              href="/schedule"
              className={`${s.navItem} ${
                pathname === "/schedule" ? s.navItemActive : ""
              }`}
              onClick={() => {
                sessionStorage.setItem("isNavigating", "true");
                if (pathname === "/") {
                  sessionStorage.setItem("navigatedFromHome", "true");
                }
              }}
            >
              Scheduler
            </Link>
            <div className={`${s.navItem} ${s.navItemDisabled}`}>Docs</div>
          </div>
        </div>

        <ConnectWallet />
      </div>
    </header>
  );
};
