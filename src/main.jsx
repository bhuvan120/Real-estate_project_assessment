import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

/**
 * Entry mounting point.
 * Wraps root App in BrowserRouter for client-side routing.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Real-estate_project_assessment">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
