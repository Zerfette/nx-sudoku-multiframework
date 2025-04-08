import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreProvider } from 'apps/react/store'
import App from './App'
import '../../../tailwind.css'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
