

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/app';


const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);


let store = createStoreWithMiddleware(reducers);


React.render(

  <Provider store={store}>
    {() => <App />}
  </Provider>,

  document.getElementById('root')

);
