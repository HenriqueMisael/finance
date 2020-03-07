import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@csstools/normalize.css';

import * as serviceWorker from './serviceWorker';
import store from './store';
import App from './screens/App';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
