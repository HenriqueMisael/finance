import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Background } from '../../../.storybook/styles';

import ConfirmationMessageModal from './confirmation-message';
import ProfileModal from './profile';
import ProfileNameInput from './profile/name-input';
import MoneyInput from '../input/money';

export default { title: 'General Components | Modal', decorators: [withKnobs] };

export const confirmationMessageModal = () => (
  <Background>
    <ConfirmationMessageModal
      height={text('Height', '7rem')}
      message={text('Message', 'Do you confirm this?')}
      visible={boolean('Visible', true)}
      onConfirm={action('Confirmed')}
      onDeny={action('Denied')}
    />
  </Background>
);

export const profileModal = () => (
  <Background>
    <ProfileModal
      nameSlot={<ProfileNameInput onChange={() => false} initialValue="" />}
      initialBalanceSlot={<MoneyInput onSubmitChange={() => false} initialValue={0} />}
      visible={boolean('Visible', true)}
      onConfirm={action('Confirmed')}
    />
  </Background>
);
