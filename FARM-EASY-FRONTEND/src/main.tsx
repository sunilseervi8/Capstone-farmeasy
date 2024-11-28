import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/Store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="147025341454-gdjmi4v58n60cd1h82g84gs7rukmcjje.apps.googleusercontent.com">
          <App />
          <Toaster
            position="top-right" // Change to "top-left", "bottom-left", etc.
            toastOptions={{
              // Default options for all toast types
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                fontSize: '16px',
                borderRadius: '8px',
                marginTop:"50px"
              },
              // Options for different types of toasts
              success: {
                style: {
                  background: '#4CAF50',
                  color: '#fff',
                },
              },
              error: {
                style: {
                  background: '#FF5252',
                  color: '#fff',
                },
              },
            }}
            // Additional customization for the toaster container
          />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
