"use client";

import React, { ReactNode } from "react";
import { Variants } from "@/types/feedback";
import s from "./alert.module.scss";

export interface AlertProps {
  children: ReactNode;
  variant?: Variants;
  className?: string;
  onClose?: () => void;
}

export const Alert = ({
  children,
  variant = "primary",
  className = "",
  onClose,
}: AlertProps) => {
  return (
    <div className={`${s.alert} ${s[variant]} ${className}`}>
      <div className={s.content}>{children}</div>
      {onClose && (
        <button
          type="button"
          className={s.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
