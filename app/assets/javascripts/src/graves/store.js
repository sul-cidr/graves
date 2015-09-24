

import { reduxReactRouter } from 'redux-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import reducers from './reducers';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory })
)(createStore);


export default createStoreWithMiddleware(reducers);
