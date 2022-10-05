import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ToggleColorModeProvider from 'utils/ToggleColorMode';
import store from './store/configureStore';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <App />
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
