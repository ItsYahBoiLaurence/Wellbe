import { MantineTheme, createTheme, rem } from '@mantine/core';

const theme = createTheme({
  fontFamily:
    'Cairo, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  white: '#fff',
  black: '#313131',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(20),
    xl: rem(24),
    xxl: rem(32),
  },
  headings: {
    fontWeight: rem(700),
  },
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    xxl: rem(40),
  },
}) as MantineTheme;

export { theme };
