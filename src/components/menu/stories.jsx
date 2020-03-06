import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import i18next from 'i18next';

import { Background, Centered } from '../../../.storybook/styles';

import Menu from './index';
import MenuItem from './item';

export default { title: 'Menu', decorators: [withKnobs] };

export const menu = () => (
  <Background>
    <Menu onHide={action('Clicked hide button')} visible={boolean('Visible', true)}>
      <MenuItem
        active={number('Active screen', 0) === 0}
        onClick={action(`Clicked menu item for ${i18next.t('screen')} 0`)}
      >
        {`${i18next.t('screen')} 0`}
      </MenuItem>
      <MenuItem
        active={number('Active screen') === 1}
        onClick={action(`Clicked menu item for ${i18next.t('screen')} 1`)}
      >
        {`${i18next.t('screen')} 1`}
      </MenuItem>
      <MenuItem
        active={number('Active screen') === 2}
        onClick={action(`Clicked menu item for ${i18next.t('screen')} 2`)}
      >
        {`${i18next.t('screen')} 2`}
      </MenuItem>
    </Menu>
  </Background>
);

export const menuItem = () => (
  <Centered backgroundColor="#212121">
    <MenuItem onClick={action('Clicked menu item')} active={boolean('active', false)}>
      {text('Menu item name', 'Menu item sample')}
    </MenuItem>
  </Centered>
);
