import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import MoneyText from '../../money-text';
import styles from '../../styles';

const Root = styled.section`
  display: flex;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  margin-top: 0.5rem;
  height: 5rem;
  &:first-child {
    margin-top: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.span(
  styles.text,
  styles.body2,
  css`
    white-space: nowrap;
  `,
);

const Title = styled.span(
  styles.text,
  styles.body1,
  ({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
  `,
);

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  width: 100%;
  max-width: ${'calc(100% - 2rem)'};
`;

const DescriptionContainer = styled.div(
  styles.text,
  styles.body2,
  css`
    text-overflow: ellipsis;
    overflow: hidden;
  `,
);

function EntryCard({ title: name, value, description, children }) {
  return (
    <Root>
      <ContentContainer>
        <Header>
          <Title>{name}</Title>
          <MoneyText>{value}</MoneyText>
        </Header>
        <DescriptionContainer>
          <Text>{description}</Text>
        </DescriptionContainer>
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
