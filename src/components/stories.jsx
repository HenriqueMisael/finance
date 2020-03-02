import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { MdMenu } from 'react-icons/md';
import i18next from 'i18next';

import { Absolute, Centered } from '../../.storybook/styles';

import IconButton from './buttons/icon';
import Header from './header';
import MoneyText from './money-text';

export default { title: 'General Components | Button', decorators: [withKnobs] };

export const header = () => {
  return (
    <Absolute>
      <Header
        slotButton={
          <IconButton onClick={action('Clicked menu button')}>
            <MdMenu />
          </IconButton>
        }
      >
        {i18next.t('app.title')}
      </Header>
    </Absolute>
  );
};

export const moneyInput = () => (
  <Centered>
    <MoneyText>{number('Valor esquerdo', 43200.85)}</MoneyText>
    <MoneyText>{number('Valor direito', -3300.9)}</MoneyText>
  </Centered>
);
