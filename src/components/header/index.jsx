import React from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer, Root, Title } from './styled-wrappers';

function Header({ slotButton, children }) {
  return (
    <Root>
      <ButtonContainer>{slotButton}</ButtonContainer>
      <Title>{children}</Title>
    </Root>
  );
}

Header.propTypes = {
  slotButton: PropTypes.node.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(Header);
