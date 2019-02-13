import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import getGA from '../services/googleAnalytics';

export default function configureStore(initialState) {
  const readyStateCheckInterval = setInterval(() => {
    const start = window.performance.timing.navigationStart;
    const end = window.performance.timing.domContentLoadedEventEnd;
    if (end !== 0) {
      const time = end - start;
      getGA().timing({
        category: 'Timing',
        variable: 'Page Load',
        value: time,
      });

      clearInterval(readyStateCheckInterval);
    }
  }, 10);

  getGA().pageview(window.location.pathname + window.location.hash);
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );
}
