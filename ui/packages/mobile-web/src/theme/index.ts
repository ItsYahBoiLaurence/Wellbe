import {
  ActionIcon,
  Button,
  Input,
  MantineTheme,
  MantineThemeColors,
  PinInput,
  Progress,
  TextInput,
  Textarea,
  VariantColorsResolver,
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (
    parsedColor.isThemeColor &&
    parsedColor.color === 'lime' &&
    input.variant === 'filled'
  ) {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
      hoverColor: 'var(--mantine-color-black)',
    };
  }

  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `${rem(1)} solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-9)',
      hover: 'var(--mantine-color-red-8)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  if (input.variant === 'primary') {
    return {
      background: '#6B4EFF',
      hover: darken('#6B4EFF', 0.1),
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  if (input.variant === 'secondary') {
    return {
      background: '#fff',
      hover: darken('#fff', 0.1),
      color: '#090A0A',
      border: 'none',
    };
  }

  if (input.variant === 'text') {
    return {
      background: 'transparent',
      hover: 'transparent',
      hoverColor: darken('#6B4EFF', 0.1),
      color: '#6B4EFF',
      border: 'none',
    };
  }

  if (input.variant === 'outline') {
    return {
      background: 'transparent',
      hover: rgba(parsedColor.value, 0.1),
      color: '#131214',
      border: `${rem(1)} solid #E3E5E5`,
    };
  }

  return {
    ...defaultResolvedColors,
    pink: '#FF6B81',
  };
};

const COLORS: Partial<MantineThemeColors> = {
  primary: [
    '#E7E7FF',
    '#B8A9FF',
    '#9E89FF',
    '#856AFF',
    '#6B4EFF',
    '#5A3ECC',
    '#4A32A3',
    '#3A267A',
    '#2A1C5A',
    '#1A103B',
  ],
  gray: [
    '#F9F9F8',
    '#F0F0EF',
    '#E0E0DE',
    '#CFCFCD',
    '#BFBFBC',
    '#AFAFAA',
    '#9E9E99',
    '#7E7E79',
    '#5E5E59',
    '#3F3F3A',
  ],
  darkGray: [
    '#C1C1BF',
    '#A9A9A6',
    '#92928E',
    '#7A7A76',
    '#63635F',
    '#3F3F3A',
    '#353531',
    '#2A2A28',
    '#20201F',
    '#151514',
  ],
  pink: [
    '#FF99BB',
    '#FF66A8',
    '#FF4C9B',
    '#FF338E',
    '#FF007B',
    '#BF005E',
    '#99004D',
    '#7F003E',
    '#660030',
    '#40001F',
  ],
  blue: [
    '#99D4FF',
    '#66C1FF',
    '#4CB6FF',
    '#33ABFF',
    '#00A1FF',
    '#0081CC',
    '#006999',
    '#005277',
    '#003B55',
    '#002033',
  ],
};

const theme = createTheme({
  variantColorResolver,
  fontFamily:
    'Cairo, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  headings: {
    fontFamily: 'Gelasio, sans-serif',
    fontWeight: rem(700),
  },
  colors: COLORS,
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
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    xxl: rem(40),
  },
  components: {
    Button: Button.extend({
      styles: {
        root: {
          height: 48,
          fontSize: 16,
          fontWeight: 600,
          borderRadius: '48px',
          padding: '16px auto',
        },
      },
    }),
    Input: Input.extend({
      styles: {
        input: {
          borderColor: COLORS?.gray?.[2],
          borderRadius: 8,
          height: 48,
          fontSize: 16,
          '&:focus': {
            borderColor: COLORS?.primary?.[4],
          },
        },
      },
    }),
    TextInput: TextInput.extend({
      styles: {
        error: {
          marginTop: 4,
        },
      },
    }),
    PinInput: PinInput.extend({
      styles: {
        root: {
          gap: 16,
        },
        pinInput: {
          borderColor: COLORS?.gray?.[2],
          height: 32,
          width: 32,
          fontSize: 16,
          '&:focus': {
            borderColor: COLORS?.primary?.[4],
          },
          '@media (min-width: 767px)': {
            height: 48,
            width: 48,
          },
        },
        input: {
          '&.mantine-PinInput-input': {
            borderRadius: '100%',
            height: '100%',
            width: '100%',
            minHeight: 'auto',
            fontSize: 14,
          },
        },
      },
    }),
    Textarea: Textarea.extend({
      styles: {
        wrapper: {
          minHeight: 175,
          backgroundColor: '#FFF',
          borderRadius: 8,
        },
        input: {
          '&.mantine-Textarea-input': {
            height: '100%',
            paddingTop: 21,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 21,
            borderRadius: 8,
          },
        },
      },
    }),
    Progress: Progress.extend({
      styles: {
        root: {
          height: 4,
          borderRadius: 4,
        },
        section: {
          backgroundColor: COLORS.primary?.[4],
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      styles: {
        root: {
          borderRadius: '100%',
          height: 48,
          width: 48,
          '&[data-disabled="true"]': {
            opacity: 0.5,
          },
        },
      },
    }),
  },
}) as MantineTheme;

export { theme };
