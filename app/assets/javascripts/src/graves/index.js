

import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Route } from 'react-router';
import store from './store';
import App from './components/app';


React.render(

  <Provider store={store}>{() =>
    <ReduxRouter>
      <Route path="/" component={App}>
      </Route>
    </ReduxRouter>
  }</Provider>,

  document.getElementById('root')

);
