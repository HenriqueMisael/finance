import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import { Centered } from '../../../.storybook/styles';

import TextInput from './text';
import NumberInput from './number';
import { action } from '@storybook/addon-actions';

export default {
  title: 'General Components | Input',
  decorators: [withKnobs],
};

export const text = () => (
  <Centered secondary padding>
    <TextInput initialValue="" disabled={boolean('Disabled', false)} onSubmitChange={action('Submitting')} />
  </Centered>
);


export const number = () => (
  <Centered secondary padding>
    <NumberInput initialValue={0} disabled={boolean('Disabled', false)} onSubmitChange={action('Submitting')} />
  </Centered>
);
