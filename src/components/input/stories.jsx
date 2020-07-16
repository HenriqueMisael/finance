import React, { useState } from 'react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MdCheck } from 'react-icons/md';
import { Centered } from '../../../.storybook/styles';

import TextInput from './text';
import IntegerInput from './integer';
import MoneyInput from './money';
import IconButton from '../buttons/icon';
import Select from './Select';

export default {
  title: 'General Components | Input',
  decorators: [withKnobs],
};

export const textInput = () => (
  <Centered secondary padding>
    <TextInput
      placeholder="This is a input for text stuff"
      disabled={boolean('Disabled', false)}
      initialValue=""
      onSubmitChange={action('Submitting')}
    />
  </Centered>
);

export const textInputWithButton = () => (
  <Centered secondary padding>
    <TextInput
      placeholder="This is a input for text stuff"
      disabled={boolean('Disabled', false)}
      initialValue=""
      onSubmitChange={action('Submitting')}
    >
      <IconButton
        disabled={boolean('Input button disabled', false)}
        ariaLabel="Input button sample"
        onClick={action('Input button clicked')}
      >
        <MdCheck />
      </IconButton>
    </TextInput>
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

export const select = () => {
  return (
    <Centered>
      <Select
        options={[
          { id: '1', label: 'Option one' },
          { id: '2', label: 'Option two' },
          { id: '3', label: 'Option three' },
          { id: '4', label: 'Option four' },
        ]}
        onSelect={action('Selected an option')}
        selected=""
      />
    </Centered>
  );
};
