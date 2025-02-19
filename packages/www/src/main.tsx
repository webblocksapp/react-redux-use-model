import './index.css';
import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'reactjs-ui-core';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider themeName="githubDark">
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
);
