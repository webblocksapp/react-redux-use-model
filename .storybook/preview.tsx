import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { worker } from '@mocks/browser';
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
        <Story />
      </Provider>
    ),
  ],
};

export default preview;
