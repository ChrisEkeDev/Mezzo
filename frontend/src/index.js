import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import LoadingProvider from './context/loading';
import AlertsProvider from './context/alerts';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoadingProvider>
          <AlertsProvider>
            <App />
          </AlertsProvider>
        </LoadingProvider>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
