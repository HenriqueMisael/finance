import { css } from 'styled-components';

export default {
  body1: ({ theme }) => css`
    font-family: 'Roboto Slab', sans-serif;
    font-size: 1rem;
    color: ${theme.text.primary};
    font-weight: ${theme.font.weight.regular};

    &[disabled] {
      color: ${theme.text.disabled};
    }

    > light {
      font-weight: ${theme.font.weight.light};
    }

    > strong {
      font-weight: ${theme.font.weight.bold};
    }
  `,
  body2: ({ theme }) => css`
    font-family: 'Roboto Slab', sans-serif;
    font-size: 0.75rem;
    color: ${theme.text.secondary};
    font-weight: ${theme.font.weight.regular};

    &[disabled] {
      color: ${theme.text.disabled};
    }

    > light {
      font-weight: ${theme.font.weight.light};
    }

    > strong {
      font-weight: ${theme.font.weight.bold};
    }
  `,
  head: ({ theme }) => css`
    font-family: 'Roboto Slab', sans-serif;
    font-size: 1.5rem;
    color: ${theme.text.primary};

    &[disabled] {
      color: ${theme.text.disabled};
    }
  `,
  head2: ({ theme }) => css`
    font-family: 'Roboto Slab', sans-serif;
    font-size: 1.125rem;
    color: ${theme.text.primary};

    &[disabled] {
      color: ${theme.text.disabled};
    }
  `,
  button: css`
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
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
    &:hover,
    :focus-within {
      background-color: ${theme.background.secondary};
    }

    &:focus-within {
      border-color: ${theme.border.accent};
    }

    &[disabled] {
      background-color: ${theme.background.disabled};
      &:hover,
      :focus-within {
        background-color: ${theme.background.disabled};
      }
    }
  `,
  modal: ({ theme }) => css`
    z-index: 2;
    opacity: 95%;
    position: absolute;

    background: ${theme.background.primary};

    transition-property: left, top, bottom, right;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  `,
};
