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
    <defs>
      <linearGradient id="chronosGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="chronosGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Outer ring with tick marks */}
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="url(#chronosGradient)"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Inner circle */}
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="none"
      stroke="url(#chronosGradient)"
      strokeWidth="1.5"
    />

    {/* Tick marks */}
    <path d="M12 4v1.5" stroke="url(#chronosGradient)" strokeWidth="1" />
    <path d="M12 18.5v1.5" stroke="url(#chronosGradient)" strokeWidth="1" />
    <path d="M4 12h1.5" stroke="url(#chronosGradient)" strokeWidth="1" />
    <path d="M18.5 12h1.5" stroke="url(#chronosGradient)" strokeWidth="1" />

    {/* Hour hand */}
    <path
      d="M12 12L12 8"
      stroke="url(#chronosGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Minute hand */}
    <path
      d="M12 12L16 12"
      stroke="url(#chronosGradient2)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Center dot */}
    <circle cx="12" cy="12" r="1.2" fill="url(#chronosGradient)" />

    {/* Small decorative elements */}
    <path
      d="M7 7L8 8"
      stroke="url(#chronosGradient)"
      strokeWidth="0.8"
      opacity="0.8"
    />
    <path
      d="M17 17L16 16"
      stroke="url(#chronosGradient)"
      strokeWidth="0.8"
      opacity="0.8"
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
        <svg
          className={s.walletIcon}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path
            d="M19 7h-1V6a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3zm-1 9a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2z"
            fill="currentColor"
          />
        </svg>
        <span>Connect Wallet</span>
      </Button>
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
  return (
    <header className={s.header}>
      <div className={s.headerBackground}></div>
      <div className={s.headerContent}>
        <div className={s.logoSection}>
          <HeliosLogo />
          <div className={s.divider}></div>
          <div className={s.chronosSection}>
            <ChronosIcon />
            <span className={s.chronosText}>Chronos</span>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.navLinks}>
            <div className={`${s.navLink} ${s.navLinkDisabled}`}>
              <svg
                className={s.navIcon}
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
                  fill="currentColor"
                />
              </svg>
              Home
            </div>
            <div className={`${s.navLink} ${s.navLinkDisabled}`}>
              <svg
                className={s.navIcon}
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V9h10v2zm0-4H7V5h10v2z"
                  fill="currentColor"
                />
              </svg>
              Docs
              <span className={s.comingSoon}>Soon</span>
            </div>
          </div>
          <Wallet />
        </div>
      </div>
    </header>
  );
};
