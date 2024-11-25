import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "./styles/GlobalStyle.jsx";
import Theme from "./styles/Theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
