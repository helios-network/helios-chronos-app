"use client"

import clsx from "clsx"
import { ReactNode } from "react"
import s from "./button.module.scss"

export interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "small" | "medium" | "large"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
}

export const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  type = "button",
  ...props
}: ButtonProps) => {
  const classNames = clsx(
    s.btn,
    s[variant],
    s[size],
    disabled && s.disabled,
    className
  )

  return (
    <button
      {...props}
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
