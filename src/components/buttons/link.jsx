import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import styles from '../styles';

const Root = styled.button(
  styles.text,
  styles.button,
  ({ theme }) => css`
    padding: 0.5rem 1rem;
    background: transparent;

    font-size: 1em;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.text.primary};

    &:hover {
      text-decoration: underline;
    }
    &[disabled] {
      cursor: not-allowed;
      color: ${theme.button.disabled.text};
      &:hover {
        text-decoration: none;
      }
    }
  `,
);

function LinkButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

LinkButton.defaultProps = {
  disabled: false,
};

export default React.memo(LinkButton);
