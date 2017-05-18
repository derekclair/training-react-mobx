/* eslint-disable */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import {
  // transaction,
  // reaction,
  // when,
  useStrict,
} from 'mobx';


import App from './App.jsx';
import store from './store.js';

useStrict(true);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
