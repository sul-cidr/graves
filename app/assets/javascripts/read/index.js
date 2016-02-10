

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/app';
import createStore from './store';
import reducers from './reducers';


let store = createStore(reducers);


ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('read'),

);


import './page';
