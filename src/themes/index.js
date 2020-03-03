import colors from './colors';

/**
 * @typedef {Object} Theme
 * @property {{}} background
 * @property {{}} button
 * @property {{}} text
 * @property {{}} border
 */

/**
 * @returns {Theme}
 */
function createTheme(name, background, button, text, border) {
  return {
    name,
    background,
    button,
    text: { ...text, positive: colors.green700, negative: colors.red700 },
    font: {
      weight: {
        medium: 500,
      },
    },
    border,
  };
}

const dark = createTheme(
  'dark',
  {
    default: colors.black,
    primary: colors.grey900,
    secondary: colors.grey800,
    accent: colors.grey700,
    disabled: colors.grey700,
  },
  {
    primary: {
      background: colors.purple900,
      active: colors.purple800,
      text: colors.grey50,
    },
    disabled: {
      text: colors.grey400,
      background: colors.grey700,
    },
  },
  {
    primary: colors.grey50,
    secondary: colors.grey200,
    disabled: colors.grey400,
    shadow: colors.purple800,
  },
  {
    primary: colors.grey300,
    accent: colors.grey100,
  },
);

const light = createTheme(
  'light',
  {
    default: colors.grey50,
    primary: colors.grey200,
    secondary: colors.grey100,
    accent: colors.grey300,
    disabled: colors.grey400,
  },
  {
    primary: {
      background: colors.deepPurple500,
      active: colors.deepPurple700,
      text: colors.grey50,
    },
    disabled: {
      text: colors.grey700,
      background: colors.grey400,
    },
  },
  { primary: colors.grey900, secondary: colors.grey800, disabled: colors.grey700, shadow: colors.deepPurple700 },
  {
    primary: colors.grey700,
    accent: colors.grey900,
  },
);

const themes = {
  dark,
  light,
};

export const themeList = [dark, light];

export default themes;
