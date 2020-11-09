import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/popper.js/dist/popper.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
