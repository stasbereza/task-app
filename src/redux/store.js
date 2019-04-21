import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './reducers';
import thunk from './middleware/thunk';
import session from './middleware/auth';

const middleware = [logger, thunk, session];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

let sessionState = null;

try {
  sessionState = JSON.parse(localStorage.getItem('session'));
} catch (err) {
  console.log(err);
}

const persistedState = sessionState ? { auth: sessionState } : {};

const store = createStore(rootReducer, persistedState, enhancer);

export default store;
