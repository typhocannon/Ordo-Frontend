import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import '@assets/styles/tailwind.css';
import Popup from '@pages/popup/Popup';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from "./theme";
import { PageProvider } from './context/PageProvider';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
    <ChakraProvider theme={customTheme}>
      <PageProvider>
        <Popup />
      </PageProvider>
    </ChakraProvider>
  );
}

init();
