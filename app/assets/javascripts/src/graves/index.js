

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './containers/app';


let store = createStore(reducers);


React.render(

  <Provider store={store}>
    {() => <App />}
  </Provider>,

  document.getElementById('root')

);
