module.exports = {
  stories: ['../src/**/*.stories.jsx', '../src/**/stories.jsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-knobs/register',
    'storybook-addon-i18n/register'
  ],
};
