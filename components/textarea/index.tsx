"use client";

import React, { forwardRef, TextareaHTMLAttributes } from "react";
import s from "./textarea.module.scss";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      className = "",
      textareaClassName = "",
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
        <textarea
          ref={ref}
          className={`${s.textarea} ${
            error ? s.textareaError : ""
          } ${textareaClassName}`}
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

Textarea.displayName = "Textarea";
