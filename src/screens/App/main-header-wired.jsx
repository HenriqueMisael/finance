import React, { useCallback, useState } from 'react';
import i18next from 'i18next';
import { MdMenu } from 'react-icons/md';
import { FaRegMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import core from '../../store/core';
import IconButton from '../../components/buttons/icon';
import Header from '../../components/header';
import Menu from '../../components/menu';
import ToggleButton from '../../components/buttons/toggle';
import { OptionTray } from '../../components/menu/styled-wrappers';

import MenuItemWired from './menu-item-wired';

const { getTheme } = core.selectors;
const { coreSetProfileTheme } = core.creators;

function MainHeaderWired() {
  const selectedTheme = useSelector(getTheme);

  const [menuVisible, setMenuVisible] = useState(false);

  const dispatch = useDispatch();

  const showMenu = useCallback(() => setMenuVisible(true), []);
  const hideMenu = useCallback(() => setMenuVisible(false), []);
  const handleChange = useCallback(
    (value) => {
      return dispatch(coreSetProfileTheme(value ? 'light' : 'dark'));
    },
    [dispatch],
  );

  return (
    <>
      <Menu onHide={hideMenu} visible={menuVisible}>
        <OptionTray>
          <ToggleButton
            onChange={handleChange}
            initialValue={selectedTheme === 'light'}
            steps={[<FaRegMoon />, <FaSun />]}
          />
        </OptionTray>
        <MenuItemWired hideMenu={hideMenu} route="/" title={i18next.t('home.title')} />
        <MenuItemWired
          hideMenu={hideMenu}
          route="/entry-list"
          title={i18next.t('entryList.title')}
        />
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
