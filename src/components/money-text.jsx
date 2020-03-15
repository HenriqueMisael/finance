import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import format from '../utils/format';

import styles from './styles';

const Root = styled.span(
  styles.text,
  ({ theme, positive }) => css`
    font-weight: ${theme.font.weight.medium};
    color: ${positive ? theme.text.positive : theme.text.negative};
  `,
);

function MoneyText({ children }) {
  const moneyValue = format.money(Math.abs(children));

  return <Root positive={children > 0}>{`R$ ${moneyValue}`}</Root>;
}

MoneyText.propTypes = {
  children: PropTypes.number.isRequired,
};

export default React.memo(MoneyText);
