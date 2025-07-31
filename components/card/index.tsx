"use client"

import clsx from "clsx"
import { ReactNode } from "react"
import s from "./card.module.scss"

export interface CardProps {
  children: ReactNode
  className?: string
  padding?: "none" | "small" | "medium" | "large"
  hover?: boolean
}

export const Card = ({
  children,
  className,
  padding = "medium",
  hover = false
}: CardProps) => {
  const classNames = clsx(s.card, s[padding], hover && s.hover, className)

  return <div className={classNames}>{children}</div>
}
