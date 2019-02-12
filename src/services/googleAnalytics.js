import ReactGA from 'react-ga';
import config from '../config';

let GA;

export default function getGA() {
  if (!config.isProd) {
    return {
      event: (data) => { console.log('event: ', data); },
      pageview: (pathname) => { console.log('pageview: ', pathname); },
    };
  }

  if (!GA) {
    GA = ReactGA;
    GA.initialize(config.googleTrackingId, {
      siteSpeedSampleRate: 100,
    });
  }

  return GA;
}
