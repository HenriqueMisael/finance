import styled from 'styled-components';

export const Background = styled.div`
  background: ${({ theme, backgroundColor = theme.background.default }) =>
    backgroundColor};
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
