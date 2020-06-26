import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Background } from '../../../.storybook/styles';

import TransactionMethodListItemWrapper from './item';

export default { title: 'Transaction Method List | List', decorators: [withKnobs] };

export const item = () => (
  <Background>
    <TransactionMethodListItemWrapper
      description="Bank transfer"
      selected={boolean('Selected', false)}
      onSave={action('Submit name')}
      onClick={action('Clicked')}
    />
  </Background>
);
