import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import i18next from 'i18next';

import Header from '../header';
import GoBackButton from '../buttons/go-back';

const Root = styled.div`
  opacity: 95%;
  position: absolute;
  width: 90vw;
  height: 100vh;
  left: ${({ visible }) => (visible ? 0 : '-100vw')};

  background: ${({ theme }) => theme.background.primary};

  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  z-index: 2;
`;

function Menu({ children, visible, onHide }) {
  return (
    <Root visible={visible}>
      <Header slotButton={<GoBackButton onClick={onHide} />}>
        {i18next.t('app.menu')}
      </Header>
      {children}
    </Root>
  );
}

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default React.memo(Menu);
