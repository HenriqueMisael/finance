import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Background } from '../../../.storybook/styles';

import ConfirmationModal from './confirmation';

export default { title: 'Modal', decorators: [withKnobs] };

export const confirmationModal = () => (
  <Background>
    <ConfirmationModal
      message={text('Message', 'Do you confirm this?')}
      visible={boolean('Visible', true)}
      onConfirm={action('Confirmed')}
      onDeny={action('Denied')}
    />
  </Background>
);
