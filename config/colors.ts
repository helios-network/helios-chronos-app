/**
 * Helios Chronos App Color Palette
 *
 * This file contains the complete color system for the application,
 * providing a centralized location for all color definitions.
 */

// Primary Colors
export const COLORS = {
  // Main brand color - used for primary actions, links, and highlights
  primary: "#002DCB",
  primaryLight: "#1a47d4",
  primaryDark: "#001ba3",

  // Text Colors
  textPrimary: "#040F34", // Main text, headings
  textSecondary: "#5C6584", // Secondary text, labels
  textTertiary: "#828DB3", // Muted text, placeholders

  // Background Colors
  backgroundPrimary: "#ffffff", // Main content background
  backgroundSecondary: "#E2EBFF", // Page background, subtle sections
  backgroundMedium: "#d4e1ff", // Hover states, disabled elements

  // Border Colors
  borderLight: "#c7d2fe", // Subtle borders
  borderMedium: "#a5b4fc", // Standard borders

  // Status Colors
  success: "#10b981", // Success states, positive actions
  warning: "#f59e0b", // Warning states, caution
  danger: "#ef4444", // Error states, destructive actions

  // Utility Colors
  white: "#ffffff",
  transparent: "transparent",
} as const;

// CSS Custom Properties (for use in CSS/SCSS)
export const CSS_VARIABLES = {
  "--color-primary": COLORS.primary,
  "--color-primary-light": COLORS.primaryLight,
  "--color-primary-dark": COLORS.primaryDark,

  "--color-text-primary": COLORS.textPrimary,
  "--color-text-secondary": COLORS.textSecondary,
  "--color-text-tertiary": COLORS.textTertiary,

  "--color-background-primary": COLORS.backgroundPrimary,
  "--color-background-secondary": COLORS.backgroundSecondary,
  "--color-background-medium": COLORS.backgroundMedium,

  "--color-border-light": COLORS.borderLight,
  "--color-border-medium": COLORS.borderMedium,

  "--color-success": COLORS.success,
  "--color-warning": COLORS.warning,
  "--color-danger": COLORS.danger,
} as const;

// Color utilities for JavaScript/TypeScript usage
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Predefined color combinations for common use cases
export const COLOR_COMBINATIONS = {
  primaryButton: {
    background: COLORS.primary,
    text: COLORS.white,
    hover: COLORS.primaryDark,
  },
  secondaryButton: {
    background: COLORS.backgroundMedium,
    text: COLORS.textPrimary,
    hover: COLORS.borderMedium,
  },
  card: {
    background: COLORS.backgroundPrimary,
    border: COLORS.borderLight,
    text: COLORS.textPrimary,
  },
  input: {
    background: COLORS.backgroundPrimary,
    border: COLORS.borderLight,
    text: COLORS.textPrimary,
    placeholder: COLORS.textTertiary,
    focus: COLORS.primary,
  },
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorCombination = keyof typeof COLOR_COMBINATIONS;
