import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import Header from '../header';
import GoBackButton from '../buttons/go-back';

import { Root } from './styled-wrappers';

function Menu({ children, visible, onHide }) {
  return (
    <Root visible={visible}>
      <Header slotButton={<GoBackButton ariaLabel="Hide menu" onClick={onHide} />}>
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
