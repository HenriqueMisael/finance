import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import MoneyText from '../money-text';
import styles from '../styles';

const Root = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 0.5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.span(styles.text, styles.body2);

const Title = styled.span(
  styles.text,
  styles.body1,
  ({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
  `,
);

function EntryCard({ title, value, description }) {
  return (
    <Root>
      <Header>
        <Title>{title}</Title>
        <MoneyText>{value}</MoneyText>
      </Header>
      <Text>{description}</Text>
    </Root>
  );
}

EntryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default EntryCard;
