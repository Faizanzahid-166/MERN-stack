import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router'
import routers from './Routers.jsx'
import ThemeProvider from './context/ThemeContextProvider.jsx'//dark theme provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
     <RouterProvider router={routers} />
    </ThemeProvider>
  </StrictMode>,
)
