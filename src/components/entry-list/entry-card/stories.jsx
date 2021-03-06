import React from 'react';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { Centered } from '../../../../.storybook/styles';
import IconButton from '../../buttons/icon';

import EntryCard from './index';
import EntryCardActions from './entry-card-actions';

export default { title: 'Entry List | Entry Card', decorators: [withKnobs] };

export const readonly = () => (
  <Centered>
    <EntryCard
      id="Sample entry"
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    />
  </Centered>
);

export const withActions = () => (
  <Centered>
    <EntryCard
      id="Sample entry"
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    >
      <EntryCardActions>
        <IconButton ariaLabel="Delete entry" onClick={action('Clicked delete button')}>
          <MdDelete />
        </IconButton>
        <IconButton ariaLabel="Edit entry" onClick={action('Clicked edit button')}>
          <MdModeEdit />
        </IconButton>
      </EntryCardActions>
    </EntryCard>
  </Centered>
);
