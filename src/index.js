import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux'

const store = configureStore()

ReactDOM.render(
  <ReduxProvider store={store}>
  <Router>
    <App />
  </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
