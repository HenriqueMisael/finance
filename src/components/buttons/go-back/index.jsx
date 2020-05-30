import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack } from 'react-icons/md';

import IconButton from '../icon';

function GoBackButton({ ariaLabel, onClick }) {
  return (
    <IconButton ariaLabel={ariaLabel} onClick={onClick}>
      <MdArrowBack />
    </IconButton>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
};

GoBackButton.defaultProps = {
  ariaLabel: 'Go back button',
};

export default React.memo(GoBackButton);
