import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TransProvider, useTrans } from "./contexts/transContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransProvider>
    <App />
    </TransProvider>
  </React.StrictMode>,
)
