import React from 'react';
import { number, withKnobs } from '@storybook/addon-knobs';

import { Centered } from '../../../.storybook/styles';

import TotalBalance from './total-balance';

export default { title: 'Home | Balance', decorators: [withKnobs] };

export const balance = () => {
  return (
    <Centered>
      <TotalBalance totalBalance={number('Total balance', 25000)} />
    </Centered>
  );
};
