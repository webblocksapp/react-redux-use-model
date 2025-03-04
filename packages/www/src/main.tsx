import './index.css';
import { App } from './App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CodeProvider, ThemeProvider } from 'reactjs-ui-core';
import { store } from '@store';
import { ModelProvider } from 'react-redux-use-model';
import { Provider } from 'react-redux';
import { MswProvider } from '@components/MswProvider';

const apiClients = import.meta.glob('../src/api-clients/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const codeSnippets = import.meta.glob('../src/code-snippets/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const components = import.meta.glob('../src/components/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const constants = import.meta.glob('../src/constants/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const interfaces = import.meta.glob('../src/interfaces/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const models = import.meta.glob('../src/models/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const utils = import.meta.glob('../src/utils/**/*.(ts|tsx|sh)', {
  as: 'raw',
});

const modules = {
  ...apiClients,
  ...codeSnippets,
  ...components,
  ...constants,
  ...interfaces,
  ...models,
  ...utils,
};
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
          <HashRouter>
            <CodeProvider loadCodeSnippets={loadCodeSnippets}>
              <App />
            </CodeProvider>
          </HashRouter>
        </ThemeProvider>
      </ModelProvider>
    </Provider>
  </MswProvider>
);
