import { css } from 'styled-components';

export default {
  text: css`
    font-family: 'Roboto';
  `,
  body2: ({ theme }) => css`
    font-size: 0.75rem;
    color: ${theme.text.secondary};
  `,
  body1: ({ theme }) => css`
    font-size: 1rem;
    color: ${theme.text.primary};
  `,
  title: css`
    font-size: 1.5rem;
  `,
  button: css`
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: transparent;
  `,
};
