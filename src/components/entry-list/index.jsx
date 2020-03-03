import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import i18next from 'i18next';

import Header from '../header';
import GoBackButton from '../buttons/go-back';

const Root = styled.div`
  height: 100%;
  width: 100%;
`;

const ItemsContainer = styled.div`
  padding: 0.5rem;
  overflow-y: auto;
`;

function EntryList({ children, onGoBack }) {
  return (
    <Root>
      <Header slotButton={<GoBackButton onClick={onGoBack} />}>
        {i18next.t('entryList.title')}
      </Header>
      <ItemsContainer>{children}</ItemsContainer>
    </Root>
  );
}

EntryList.propTypes = {
  children: PropTypes.node.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default EntryList;
