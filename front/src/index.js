import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Certifique-se de que este import existe e o caminho está correto

const root = createRoot(document.getElementById('root'));
root.render(<App />);