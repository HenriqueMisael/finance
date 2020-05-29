import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.secondary};
  font-size: 0.8rem;

  width: 2rem;
  height: 5rem;

  border-left-color: ${({ theme }) => theme.border.detail};
  border-left-width: thin;
  border-left-style: solid;
`;
