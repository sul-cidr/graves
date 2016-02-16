

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);


export default createStoreWithMiddleware;
