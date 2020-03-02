import { addDecorator, addParameters } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import {themeList} from '../src/themes';

addParameters({
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      OnePlus7Pro: {
        name: 'OnePlus 7 Pro',
        styles: {
          width: '471px',
          height: '1019px'
        }
      }
    },
  },
});
addDecorator(withThemesProvider(themeList));
