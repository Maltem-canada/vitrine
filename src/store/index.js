import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import getGA from '../services/googleAnalytics';


export default function configureStore(initialState) {
  getGA().pageview(window.location.pathname + window.location.hash);
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );
}
