import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack } from 'react-icons/md';

import IconButton from './icon';

function GoBackButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <MdArrowBack />
    </IconButton>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(GoBackButton);
