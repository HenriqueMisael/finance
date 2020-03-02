import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { Md3DRotation } from 'react-icons/md';

import { Centered } from '../../../.storybook/styles';

import PrimaryButton from './primary';
import LinkButton from './link';
import IconButton from './icon';

export default { title: 'General Components | Button', decorators: [withKnobs] };

export const allButtons = () => (
  <Centered fontSize={number('Font size', 16)}>
    <PrimaryButton
      onClick={action('Clicked primary button')}
      disabled={boolean('Disabled', false)}
    >
      Primary Button
    </PrimaryButton>
    <LinkButton
      onClick={action('Clicked link button')}
      disabled={boolean('Disabled', false)}
    >
      Link Button
    </LinkButton>
    <IconButton
      onClick={action('Clicked icon button')}
      disabled={boolean('Disabled', false)}
    >
      <Md3DRotation />
    </IconButton>
  </Centered>
);
