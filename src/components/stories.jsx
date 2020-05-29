import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { MdMenu } from 'react-icons/md';
import i18next from 'i18next';

import { Background, Centered } from '../../.storybook/styles';

import IconButton from './buttons/icon';
import Header from './header';
import MoneyText from './text/money';

export default { title: 'General Components | Other', decorators: [withKnobs] };

export const header = () => {
  return (
    <Background>
      <Header
        slotButton={
          <IconButton onClick={action('Clicked menu button')}>
            <MdMenu />
          </IconButton>
        }
      >
        {i18next.t('app.title')}
      </Header>
    </Background>
  );
};

export const moneyText = () => (
  <Centered>
    <MoneyText>{number('Valor esquerdo', 43200.85)}</MoneyText>
    <MoneyText>{number('Valor direito', -3300.9)}</MoneyText>
  </Centered>
);
