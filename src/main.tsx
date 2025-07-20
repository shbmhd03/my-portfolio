import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Handle GitHub Pages SPA routing
const redirectPath = sessionStorage.getItem('redirectPath');
console.log('Checking for redirectPath:', redirectPath);
if (redirectPath) {
  console.log('Redirecting to:', redirectPath);
  sessionStorage.removeItem('redirectPath');
  window.history.replaceState(null, '', redirectPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
