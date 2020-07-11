import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MdCheck, MdDelete } from 'react-icons/md';

import { Background } from '../../../.storybook/styles';
import IconButton from '../buttons/icon';

import TransactionMethodListItemWrapper from './item';
import TransactionMethodListItemPreview from './item/preview';
import TransactionMethodListItemSelected from './item/selected';

export default { title: 'Transaction Method List | List', decorators: [withKnobs] };

export const selected = () => (
  <Background>
    <TransactionMethodListItemWrapper
      onClick={action('Clicked')}
      selected={boolean('Selected', false)}
    >
      <TransactionMethodListItemSelected
        description={text('Description', 'Bank transfer')}
        onChange={action('Change text')}
      >
        <IconButton onClick={action('Save')}>
          <MdCheck />
        </IconButton>
      </TransactionMethodListItemSelected>
    </TransactionMethodListItemWrapper>
  </Background>
);

export const preview = () => (
  <Background>
    <TransactionMethodListItemWrapper
      onClick={action('Clicked')}
      selected={boolean('Selected', false)}
    >
      <TransactionMethodListItemPreview
        slotButton={
          <IconButton onClick={action('Delete')}>
            <MdDelete />
          </IconButton>
        }
        description={text('Description', 'Bank transfer')}
      />
    </TransactionMethodListItemWrapper>
  </Background>
);
