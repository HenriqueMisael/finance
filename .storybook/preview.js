import { addDecorator, addParameters } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

import { themeList } from '../src/themes';
import { withI18n } from 'storybook-addon-i18n';

addParameters({
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      OnePlus7Pro: {
        name: 'OnePlus 7 Pro',
        styles: {
          width: '471px',
          height: '1019px',
        },
      },
    },
  },
  i18n: {
    provider: I18nextProvider,
    providerProps: {
      i18n,
    },
    supportedLocales: ['enUS', 'ptBR'],
    providerLocaleKey: 'locale',
  },
});
addDecorator(withThemesProvider(themeList));
addDecorator(withI18n);
