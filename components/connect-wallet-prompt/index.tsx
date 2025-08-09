"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { useAppKit } from "@reown/appkit/react";
import s from "./connect-wallet-prompt.module.scss";

interface ConnectWalletPromptProps {
  message?: string;
}

export const ConnectWalletPrompt = ({
  message = "Connect your wallet to continue",
}: ConnectWalletPromptProps) => {
  const { open: openLoginModal } = useAppKit();

  const handleConnect = async () => {
    await openLoginModal();
  };

  return (
    <Card className={s.container}>
      <div className={s.icon}>
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path
            d="M19 7h-1V6a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3zm-1 9a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h3 className={s.title}>Wallet Connection Required</h3>
      <p className={s.message}>{message}</p>
      <Button onClick={handleConnect} className={s.button}>
        Connect Wallet
      </Button>
      <div className={s.securityNote}>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            fill="currentColor"
          />
        </svg>
        <span>Your wallet connection is secure and encrypted</span>
      </div>
    </Card>
  );
};
