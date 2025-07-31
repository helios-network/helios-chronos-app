"use client";

import { Button } from "@/components/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import s from "./header.module.scss";

const HeliosLogo = () => (
  <img src="/img/logo1.png" alt="Helios" className={s.logo} />
);

const ChronosIcon = () => (
  <svg viewBox="0 0 24 24" className={s.chronosIcon}>
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Wallet = () => {
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
      <Button className={s.walletButton} onClick={handleConnect}>
        <span>Connect Wallet</span>
      </Button>
    );
  }

  return (
    <div className={s.walletConnected}>
      <span className={s.address}>{truncateAddress(address)}</span>
      <Button
        variant="outline"
        onClick={handleLogout}
        className={s.logoutButton}
      >
        Disconnect
      </Button>
    </div>
  );
};

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logoSection}>
        <HeliosLogo />
        <div className={s.divider}></div>
        <div className={s.chronosSection}>
          <ChronosIcon />
          <span className={s.chronosText}>Chronos</span>
        </div>
      </div>
      <div className={s.right}>
        <Wallet />
      </div>
    </header>
  );
};
