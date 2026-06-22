import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SoundProvider } from './context/SoundContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SoundProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </SoundProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)
