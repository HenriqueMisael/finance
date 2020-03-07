import React, { useCallback, useState } from 'react';
import i18next from 'i18next';
import { MdMenu } from 'react-icons/md';

import IconButton from '../../components/buttons/icon';
import Header from '../../components/header';
import Menu from '../../components/menu';

import MenuItemWired from './menu-item-wired';

function MainHeaderWired() {
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = useCallback(() => setMenuVisible(true), []);
  const hideMenu = useCallback(() => setMenuVisible(false), []);

  return (
    <>
      <Menu onHide={hideMenu} visible={menuVisible}>
        <MenuItemWired route="/" title={i18next.t('home.title')} />
        <MenuItemWired route="/entry-list" title={i18next.t('entryList.title')} />
      </Menu>
      <Header
        slotButton={
          <IconButton onClick={showMenu}>
            <MdMenu />
          </IconButton>
          }
      >
        {i18next.t('app.title')}
      </Header>
    </>
  );
}

export default MainHeaderWired;
