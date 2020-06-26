import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  > button,
  div:first-child {
    margin-top: 0.5rem;
  }
`;
