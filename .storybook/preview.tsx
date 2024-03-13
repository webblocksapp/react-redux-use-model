import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { ModelProvider } from '@components';
import { worker } from '@examples/mocks/browser';
import { store } from '@store';

worker.start({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ModelProvider store={store}>
          <Story />
        </ModelProvider>
      </Provider>
    ),
  ],
};

export default preview;
