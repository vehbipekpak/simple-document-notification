import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ContextMain from './context/ContextMain';

// React Router
import RouterMain from './routers/RouterMain';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextMain>
        <RouterProvider router={RouterMain} />
    </ContextMain>
)
