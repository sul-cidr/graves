

import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './containers/app';
import reducers from './reducers';


let store = createStore(reducers);


React.render(

  <Provider store={store}>
    {() => <App />}
  </Provider>,

  document.getElementById('root')

);
