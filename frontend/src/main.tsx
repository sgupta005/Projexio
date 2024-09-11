import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './features/theme/ThemeProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
          >
            <App />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
