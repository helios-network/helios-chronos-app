"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import s from "./input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      className = "",
      inputClassName = "",
      labelClassName = "",
      errorClassName = "",
      hintClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${s.container} ${className}`}>
        {label && (
          <label htmlFor={props.id} className={`${s.label} ${labelClassName}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${s.input} ${
            error ? s.inputError : ""
          } ${inputClassName}`}
          {...props}
        />
        {error && <div className={`${s.error} ${errorClassName}`}>{error}</div>}
        {hint && !error && (
          <div className={`${s.hint} ${hintClassName}`}>{hint}</div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
