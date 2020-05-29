import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.div`
  background: ${({ theme, active }) =>
    active ? theme.background.default : 'transparent'};
  padding: 1rem 1rem;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  width: 100%;

  transition: background 0.25s ease-in-out;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.background.default : theme.background.accent};
  }
`;
