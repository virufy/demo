import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';

import 'react-datepicker/dist/react-datepicker.css';
import './i18n';

// Utils
import swConfig from 'utils/swConfig';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

const StartApp = loadable(() => import('./start'), {
  fallback: <div>Loading</div>,
});

ReactDOM.render(
  <StartApp />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (process.env.NODE_ENV !== 'production') {
  serviceWorkerRegistration.unregister();
} else {
  serviceWorkerRegistration.register(swConfig);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
