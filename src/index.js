import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//Renderizar o app.js
// mostar para gente na tela tudo do computador
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



