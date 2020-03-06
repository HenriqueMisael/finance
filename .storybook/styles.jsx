import styled from 'styled-components';

export const Background = styled.div`
  background: ${({ theme, primary, secondary }) =>
    primary
      ? theme.background.primary
      : secondary
      ? theme.background.primary
      : theme.background.default};
  padding: ${({ padding }) => (padding ? '1rem' : 0)};
  width: 100vw;
  height: 100vh;
`;

export const Centered = styled(Background)`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
