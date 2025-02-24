import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { ModelProvider } from '@components';
import { worker } from '@examples/mocks/browser';
import { store } from '@examples/store';
import React, { useEffect, useState } from 'react';

const Decorators: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  const start = async () => {
    await worker.start({ onUnhandledRequest: 'bypass' });
    setLoading(false);
  };

  useEffect(() => {
    start();
  }, []);

  return loading ? (
    <></>
  ) : (
    <Provider store={store}>
      <ModelProvider store={store}>{children}</ModelProvider>
    </Provider>
  );
};

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
      <Decorators>
        <Story />
      </Decorators>
    ),
  ],
};

export default preview;
