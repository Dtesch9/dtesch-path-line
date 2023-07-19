import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, createCookieStorageManager } from '@chakra-ui/react';
import { App } from './App.tsx';
import theme from './theme.ts';

const cookieStorageManager = createCookieStorageManager('chakra-cookie-storage');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
