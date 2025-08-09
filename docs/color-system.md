# Helios Chronos App - Color System

## Overview

The Helios Chronos App uses a carefully crafted color palette designed to create a professional, modern, and cohesive user experience. The color system is built around a deep blue primary color that conveys trust, stability, and technological sophistication.

## Color Palette

### Primary Colors

- **Primary**: `#002DCB` - Main brand color for primary actions, links, and highlights
- **Primary Light**: `#1a47d4` - Lighter variant for hover states and accents
- **Primary Dark**: `#001ba3` - Darker variant for pressed states and emphasis

### Text Colors

- **Text Primary**: `#040F34` - Main text color for headings and primary content
- **Text Secondary**: `#5C6584` - Secondary text for labels and supporting content
- **Text Tertiary**: `#828DB3` - Muted text for placeholders and less important content

### Background Colors

- **Background Primary**: `#ffffff` - Main content background (white)
- **Background Secondary**: `#E2EBFF` - Page background and subtle sections
- **Background Medium**: `#d4e1ff` - Hover states and disabled elements

### Border Colors

- **Border Light**: `#c7d2fe` - Subtle borders for cards and containers
- **Border Medium**: `#a5b4fc` - Standard borders for inputs and dividers

### Status Colors

- **Success**: `#10b981` - Success states and positive actions
- **Warning**: `#f59e0b` - Warning states and caution indicators
- **Danger**: `#ef4444` - Error states and destructive actions

## Usage

### CSS Variables

All colors are available as CSS custom properties in your stylesheets:

```scss
.my-component {
  background-color: var(--primary-medium);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}
```

### TypeScript/JavaScript

Import colors from the colors configuration:

```typescript
import { COLORS, getColorWithOpacity } from "@/config/colors";

// Use solid colors
const primaryColor = COLORS.primary;

// Use colors with opacity
const primaryWithOpacity = getColorWithOpacity(COLORS.primary, 0.1);
```

### Predefined Combinations

Use predefined color combinations for common UI patterns:

```typescript
import { COLOR_COMBINATIONS } from "@/config/colors";

// Primary button styling
const buttonStyle = {
  backgroundColor: COLOR_COMBINATIONS.primaryButton.background,
  color: COLOR_COMBINATIONS.primaryButton.text,
};
```

## Design Principles

### Accessibility

- All text colors meet WCAG AA contrast requirements against their intended backgrounds
- Color is never the only way to convey information
- Focus states use sufficient contrast for keyboard navigation

### Consistency

- Use the defined color variables instead of hardcoded hex values
- Stick to the established color combinations for common UI patterns
- Maintain consistent color usage across components

### Hierarchy

- **Primary colors** for main actions and brand elements
- **Text Primary** for main content and headings
- **Text Secondary** for supporting information
- **Text Tertiary** for less important content

## Component Examples

### Buttons

```scss
.primary-button {
  background-color: var(--primary-medium);
  color: white;

  &:hover {
    background-color: var(--primary-dark);
  }
}

.secondary-button {
  background-color: var(--background-medium);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}
```

### Cards

```scss
.card {
  background-color: var(--background-primary);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
}
```

### Form Elements

```scss
.input {
  background-color: var(--background-primary);
  border: 1px solid var(--border-light);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--primary-medium);
  }
}
```

## Migration Guide

When updating existing components:

1. Replace hardcoded hex values with CSS variables
2. Use the predefined color combinations where applicable
3. Ensure proper contrast ratios are maintained
4. Test components in both light themes

## Color Psychology

The chosen color palette conveys:

- **Trust and Reliability** (Deep blue primary)
- **Professionalism** (Sophisticated color relationships)
- **Clarity** (High contrast text colors)
- **Modern Technology** (Clean, contemporary palette)

This color system supports the Helios Chronos App's mission to provide a trustworthy, professional platform for blockchain automation and task scheduling.
