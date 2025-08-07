"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import s from "./card.module.scss";

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className,
  padding = "medium",
  hover = false,
  onClick,
}: CardProps) => {
  const classNames = clsx(s.card, s[padding], hover && s.hover, className);

  return (
    <div
      className={classNames}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {children}
    </div>
  );
};
