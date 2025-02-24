import './index.css';
import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CodeProvider, ThemeProvider } from 'reactjs-ui-core';
import { store } from '@store';
import { ModelProvider } from 'react-redux-use-model';
import { Provider } from 'react-redux';

const codeSnippets = import.meta.glob('../src/code-snippets/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const implementations = import.meta.glob(
  '../src/implementations/**/*.(ts|tsx|sh)',
  {
    as: 'raw',
  }
);

const modules = { ...codeSnippets, ...implementations };
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

const main = async () => {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });

  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <ModelProvider store={store}>
        <ThemeProvider themeName="githubDark">
          <HashRouter>
            <CodeProvider loadCodeSnippets={loadCodeSnippets}>
              <App />
            </CodeProvider>
          </HashRouter>
        </ThemeProvider>
      </ModelProvider>
    </Provider>
  );
};

main();
