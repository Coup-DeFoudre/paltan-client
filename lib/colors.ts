// Brand Color System based on दी पल्टन logo
export const brandColors = {
  // Primary Brand Colors (from the 4 human figures)
  primary: {
    blue: '#3B82F6',      // Bright Blue
    green: '#10B981',     // Lime Green  
    yellow: '#F59E0B',    // Bright Yellow
    orange: '#F97316',    // Red-Orange
  },
  
  // Border Gradient Colors
  gradient: {
    yellow: '#FCD34D',    // Starting yellow
    lime: '#84CC16',      // Lime green
    teal: '#14B8A6',      // Darker green/teal
    purple: '#8B5CF6',    // Deep blue/purple
  },
  
  // Background Colors
  background: {
    dark: '#1F2937',      // Dark gray/charcoal (from logo inner background)
    darker: '#111827',    // Even darker for contrast
    black: '#000000',     // Pure black (logo outer background)
  },
  
  // Text Colors
  text: {
    white: '#FFFFFF',     // White text from logo
    light: '#F9FAFB',     // Light gray for secondary text
    muted: '#9CA3AF',     // Muted text
  },
  
  // Semantic Colors (using brand palette)
  semantic: {
    success: '#10B981',   // Using brand green
    warning: '#F59E0B',   // Using brand yellow
    error: '#F97316',     // Using brand orange
    info: '#3B82F6',      // Using brand blue
  }
} as const;

// CSS Custom Properties for easy theming
export const cssVariables = {
  '--brand-blue': brandColors.primary.blue,
  '--brand-green': brandColors.primary.green,
  '--brand-yellow': brandColors.primary.yellow,
  '--brand-orange': brandColors.primary.orange,
  '--brand-bg-dark': brandColors.background.dark,
  '--brand-bg-darker': brandColors.background.darker,
  '--brand-text-white': brandColors.text.white,
  '--brand-text-light': brandColors.text.light,
  '--brand-text-muted': brandColors.text.muted,
} as const;

// Tailwind color extensions
export const tailwindColors = {
  brand: {
    blue: brandColors.primary.blue,
    green: brandColors.primary.green,
    yellow: brandColors.primary.yellow,
    orange: brandColors.primary.orange,
  },
  brandBg: {
    dark: brandColors.background.dark,
    darker: brandColors.background.darker,
  },
  brandText: {
    white: brandColors.text.white,
    light: brandColors.text.light,
    muted: brandColors.text.muted,
  }
} as const;
