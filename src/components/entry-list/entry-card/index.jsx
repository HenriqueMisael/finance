import PropTypes from 'prop-types';
import React from 'react';

import MoneyText from '../../text/money';

import {
  ContentContainer,
  DescriptionContainer,
  Header,
  Root,
  Text,
  Title,
} from './styled-wrappers';

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

export default EntryCard;
