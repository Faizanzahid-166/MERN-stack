// By default files
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// react-router
import {RouterProvider} from 'react-router'
import routers from './Routers.jsx'

//usecontext
import ThemeProvider from './context/ThemeContextProvider.jsx'//dark theme provider

// react-redux
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
     <RouterProvider router={routers} />
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
