import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Импортируем BrowserRouter
import AppWrapper from './AppWrapper';  // Импортируем обертку

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>  {/* Оборачиваем в BrowserRouter */}
            <AppWrapper />
        </BrowserRouter>
    </React.StrictMode>
);
