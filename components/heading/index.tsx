"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import s from "./heading.module.scss";

export interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

export const Heading = ({
  children,
  level = 1,
  className,
  size = "medium",
}: HeadingProps) => {
  const Tag: React.ElementType<{ className?: string }> = `h${level}`;
  const classNames = clsx(s.heading, s[size], className);

  return <Tag className={classNames}>{children}</Tag>;
};
