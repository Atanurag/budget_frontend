import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";

// createRoot(document.getElementById('container')).render(<Demo />);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(
<BrowserRouter>
<App />
</BrowserRouter>
);

