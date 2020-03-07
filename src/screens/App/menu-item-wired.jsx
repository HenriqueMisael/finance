import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';

import MenuItem from '../../components/menu/item';

function MenuItemWired({title, route}) {

  const history = useHistory();
  const location = useLocation();

  const goTo = useCallback(() => history.push(route), [route, history]);
  return (
    <MenuItem onClick={goTo} active={location.pathname === route}>
      {title}
    </MenuItem>
  );
}

MenuItemWired.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default MenuItemWired;
