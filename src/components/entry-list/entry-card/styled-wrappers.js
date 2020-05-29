import styled, { css } from 'styled-components';
import styles from '../../styles';

export const Root = styled.section`
  display: flex;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  margin-top: 0.5rem;
  height: 5rem;
  &:first-child {
    margin-top: 0;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Text = styled.span(
  styles.body2,
  css`
    white-space: nowrap;
  `,
);
export const Title = styled.span(
  styles.body1,
  ({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
  `,
);
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  width: 100%;
  max-width: ${'calc(100% - 2rem)'};
`;
export const DescriptionContainer = styled.div(
  styles.body2,
  css`
    text-overflow: ellipsis;
    overflow: hidden;
  `,
);
