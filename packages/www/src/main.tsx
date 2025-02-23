import './index.css';
import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CodeProvider, ThemeProvider } from 'reactjs-ui-core';

const codeSnippets = import.meta.glob('../src/code-snippets/**/*.(ts|tsx|sh)', {
  as: 'raw',
});

const modules = { ...codeSnippets };
const snippets: { [key: string]: string } = {};

export const loadCodeSnippets = async () => {
  const promises: Promise<void>[] = [];

  for (const [key, value] of Object.entries(modules)) {
    promises.push(
      new Promise(async (resolve) => {
        (snippets[key] = await value()), resolve();
      })
    );
  }

  await Promise.all(promises);
  return snippets;
};

createRoot(document.getElementById('root')!).render(
  <ThemeProvider themeName="githubDark">
    <HashRouter>
      <CodeProvider loadCodeSnippets={loadCodeSnippets}>
        <App />
      </CodeProvider>
    </HashRouter>
  </ThemeProvider>
);
