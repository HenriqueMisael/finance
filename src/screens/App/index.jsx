import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';

import i18next from '../../i18n';
import themes from '../../themes';
import MainHeaderWired from './main-header-wired';
import HomeScreen from '../home';
import EntryListScreen from '../entry-list';
import ModalsWired from './modals-wired';

const AppRoot = styled.div`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100vw;
  height: 100%;
`;

function App() {
  const [selectedTheme] = useState('dark');
  const theme = themes[selectedTheme];

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18next}>
        <AppRoot backgroundColor={theme.background.default}>
          <Router>
            <ModalsWired />
            <MainHeaderWired />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/entry-list" component={EntryListScreen} />
            </Switch>
          </Router>
        </AppRoot>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;