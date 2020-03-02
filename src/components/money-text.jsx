import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from './styles';

const Root = styled.span(
  styles.text,
  styles.body,
  ({ theme, positive }) => css`
    font-weight: ${theme.font.weight.medium};
    color: ${positive ? theme.text.positive : theme.text.negative};
  `,
);

function MoneyText({ children }) {
  const moneyValue = Math.abs(children)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.');

  return (
    <Root positive={children > 0}>{`R$ ${moneyValue}`}</Root>
  );
}

MoneyText.propTypes = {
  children: PropTypes.number.isRequired,
};

export default MoneyText;
