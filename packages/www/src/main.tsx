import './index.css';
import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CodeProvider, ThemeProvider } from 'reactjs-ui-core';
import { store } from '@store';
import { ModelProvider } from 'react-redux-use-model';
import { Provider } from 'react-redux';
import { MswProvider } from '@components/MswProvider';
import { BASE_URL } from '@constants/urls.ts';

const codeSnippets = import.meta.glob('../src/code-snippets/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const implementations = import.meta.glob(
  '../src/implementations/**/*.(ts|tsx|sh)',
  {
    as: 'raw',
  }
);
const interfaces = import.meta.glob('../src/interfaces/**/*.(ts|tsx|sh)', {
  as: 'raw',
});

const modules = { ...codeSnippets, ...implementations, ...interfaces };
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
  <MswProvider>
    <Provider store={store}>
      <ModelProvider store={store}>
        <ThemeProvider themeName="githubDark">
          <HashRouter basename={BASE_URL}>
            <CodeProvider loadCodeSnippets={loadCodeSnippets}>
              <App />
            </CodeProvider>
          </HashRouter>
        </ThemeProvider>
      </ModelProvider>
    </Provider>
  </MswProvider>
);
