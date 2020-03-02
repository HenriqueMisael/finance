import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import themes from './themes';
import HomeScreen from './screens/home';

const AppRoot = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [selectedTheme] = useState('dark');
  const theme = themes[selectedTheme];

  return (
    <ThemeProvider theme={theme}>
      <AppRoot backgroundColor={theme.background.default}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </Router>
      </AppRoot>
    </ThemeProvider>
  );
}

export default App;
