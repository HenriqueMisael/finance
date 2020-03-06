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
  input: ({ theme }) => css`
    border-color: #616161;
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;

    outline: none;

    transition-property: background;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;

    padding: 0.25rem 0.5rem;

    background-color: ${theme.background.primary};
    &:hover, :focus {
      background-color: ${theme.background.secondary};
    }

    &[disabled] {
      color: ${theme.text.disabled};
      background-color: ${theme.background.disabled};
      &:hover, :focus {
        color: ${theme.text.disabled};
        background-color: ${theme.background.disabled};
      }
    }
  `,
};
