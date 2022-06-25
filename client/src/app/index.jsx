import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalReset from '../global/GlobalReset';
import GlobalTypography from '../global/GlobalTypography';
import '../styles/index.css';

createRoot(document.getElementById('root')).render(
  <>
    <GlobalReset />
    <GlobalTypography />

    <App />
  </>
);
