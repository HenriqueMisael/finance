import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';

import MenuItem from '../../components/menu/item';

function MenuItemWired({ title, route, hideMenu }) {
  const history = useHistory();
  const location = useLocation();

  const goTo = useCallback(() => {
    hideMenu();
    history.push(route);
  }, [hideMenu, route, history]);

  return (
    <MenuItem onClick={goTo} active={location.pathname === route}>
      {title}
    </MenuItem>
  );
}

MenuItemWired.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

export default MenuItemWired;
