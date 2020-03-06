import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import i18next from 'i18next';

import styles from '../styles';
import Header from '../header';
import GoBackButton from '../buttons/go-back';

const Root = styled.div(
  styles.modal,
  css`
    width: 90vw;
    height: 100vh;
    left: ${({ visible }) => (visible ? 0 : '-100vw')};
  `,
);

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
