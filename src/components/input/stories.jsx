import React from 'react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Centered } from '../../../.storybook/styles';

import TextInput from './text';
import IntegerInput from './integer';
import MoneyInput from './money';

export default {
  title: 'General Components | Input',
  decorators: [withKnobs],
};

export const textInput = () => (
  <Centered secondary padding>
    <TextInput
      disabled={boolean('Disabled', false)}
      initialValue=""
      onSubmitChange={action('Submitting')}
    />
  </Centered>
);

export const integerInput = () => (
  <Centered secondary padding>
    <IntegerInput
      disabled={boolean('Disabled', false)}
      initialValue={0}
      minValue={number('Minimum value', 0)}
      maxValue={number('Maximum value', 999)}
      onSubmitChange={action('Submitting')}
    />
  </Centered>
);

export const moneyInput = () => (
  <Centered>
    <MoneyInput
      initialValue={0}
      onSubmitChange={action('Submitting')}
      disabled={boolean('Disabled', false)}
    />
  </Centered>
);
