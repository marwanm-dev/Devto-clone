import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

createRoot(document.getElementById('root')).render(<App />);
