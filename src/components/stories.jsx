import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';
import { MdMenu } from 'react-icons/md';

import { Absolute, Centered } from '../../.storybook/styles';

import IconButton from './buttons/icon';
import Header from './header';
import MoneyText from './money-text';

export default { title: 'General Components | Button', decorators: [withKnobs] };

export const header = () => (
  <Absolute>
    <Header
      slotButton={(
        <IconButton onClick={action('Clicked menu button')}>
          <MdMenu />
        </IconButton>
      )}
    >
      Finance
    </Header>
  </Absolute>
);

export const moneyInput = () => (
  <Centered>
    <MoneyText>{number('Valor esquerdo', 43200.85)}</MoneyText>
    <MoneyText>{number('Valor direito', -3300.90)}</MoneyText>
  </Centered>
);

