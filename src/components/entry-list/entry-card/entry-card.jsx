import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import MoneyText from '../../money-text';
import styles from '../../styles';

const Root = styled.section`
  display: flex;
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

const ContentContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  width: 100%;
`;

function EntryCard({ title, value, description, children }) {
  return (
    <Root>
      <ContentContainer>
        <Header>
          <Title>{title}</Title>
          <MoneyText>{value}</MoneyText>
        </Header>
        <Text>{description}</Text>
      </ContentContainer>
      {children}
    </Root>
  );
}

EntryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.node,
};

EntryCard.defaultProps = {
  children: null,
};

export default React.memo(EntryCard);
