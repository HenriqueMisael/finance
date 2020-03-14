import React from 'react';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { Centered } from '../../../../.storybook/styles';
import IconButton from '../../buttons/icon';

import EntryCard from './entry-card';
import EntryCardActions from './entry-card-actions';

export default { title: 'Entry List | Entry Card', decorators: [withKnobs] };

export const readonly = () => (
  <Centered>
    <EntryCard
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    />
  </Centered>
);

export const withActions = () => (
  <Centered>
    <EntryCard
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    >
      <EntryCardActions>
        <IconButton onClick={action('Clicked delete button')}>
          <MdDelete />
        </IconButton>
        <IconButton onClick={action('Clicked edit button')}>
          <MdModeEdit />
        </IconButton>
      </EntryCardActions>
    </EntryCard>
  </Centered>
);
