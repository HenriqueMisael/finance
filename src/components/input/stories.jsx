import React from 'react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import { Centered } from '../../../.storybook/styles';

import TextInput from './text';
import NumberInput from './number';
import { action } from '@storybook/addon-actions';

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

export const numberInput = () => (
  <Centered secondary padding>
    <NumberInput
      disabled={boolean('Disabled', false)}
      initialValue={0}
      minValue={number('Minimum value', 0)}
      maxValue={number('Maximum value', 999)}
      onSubmitChange={action('Submitting')}
    />
  </Centered>
);