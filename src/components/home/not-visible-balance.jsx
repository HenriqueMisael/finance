import React from 'react';
import PropTypes from 'prop-types';
import { FaRegEyeSlash } from 'react-icons/fa';
import styled, { css } from 'styled-components';

import IconButton from '../buttons/icon';
import styles from '../styles';

const Text = styled.span(
  styles.body1,
  ({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
  `,
);

function NotVisibleBalance({ setVisible }) {
  return (
    <>
      <IconButton ariaLabel="Show balance" onClick={() => setVisible(true)}>
        <FaRegEyeSlash />
      </IconButton>
      <Text>—</Text>
    </>
  );
}

NotVisibleBalance.propTypes = {
  setVisible: PropTypes.func.isRequired,
};

export default NotVisibleBalance;
