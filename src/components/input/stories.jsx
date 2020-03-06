import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import { Centered } from '../../../.storybook/styles';

import TextInput from './text';

export default {
  title: 'General Components | Input',
  decorators: [withKnobs],
};

export const text = () => (
  <Centered secondary padding>
    <TextInput initialValue="" disabled={boolean('Disabled', false)} />
  </Centered>
);
