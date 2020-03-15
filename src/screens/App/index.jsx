import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import i18next from '../../i18n';
import themes from '../../themes';
import modal from '../../store/modal';
import profile from '../../store/profile';
import HomeScreen from '../home';
import EntryListScreen from '../entry-list';

import ModalsWired from './modals-wired';
import MainHeaderWired from './main-header-wired';

const { getHasProfile, getTheme } = profile.selectors;

const { modalOpen } = modal.creators;

const AppRoot = styled.div`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100vw;
  height: 100%;
`;

function App() {
  const selectedTheme = useSelector(getTheme);
  const hasProfile = useSelector(getHasProfile);

  const theme = themes[selectedTheme];

  const dispatch = useDispatch();

  useEffect(() => {
    if (hasProfile) return;
    dispatch(modalOpen('ProfileModal'));
  }, [dispatch, hasProfile]);

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18next}>
        <AppRoot backgroundColor={theme.background.default}>
          <Router basename="/finance">
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
