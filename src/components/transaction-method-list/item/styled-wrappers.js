import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.div(
  ({ theme, selected }) => css`
    padding: ${selected ? '0.5rem' : '0.25rem 0.75rem'};
    background-color: ${theme.background.primary};
    width: 100%;

    transition-property: padding;
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;
  `,
);
