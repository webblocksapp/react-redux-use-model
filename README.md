# react-redux-use-model

## Documentation

**[Documentation is available here.](https://webblocksapp.github.io/react-redux-use-model)**

react-redux-use-model is a library built on top of react-redux and Redux Toolkit. Its purpose is to simplify the management of global state in a React application by automatically normalizing data. This enables easy updates across multiple UI components displaying the same information without the need to duplicate information in the Redux state, which would otherwise require manual updates to each component when the state changes.

## Features

- Automatically normalizes data in the Redux state.
- Simplifies state management in React applications.
- Enables easy updates across multiple UI components.
- Built on top of react-redux and Redux Toolkit for seamless integration.

## Installation

Make sure you have previously installed the following dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

After that you can install `react-redux-use-model`:

```bash
npm install react-redux-use-model
```

## Project Setup

`store.ts` file definition:

```ts
import {
  configureStore,
  combineReducers as combineStates,
} from '@reduxjs/toolkit';
import { normalizedEntitiesState } from 'react-redux-use-model';

export const rootState = combineStates({
  normalizedEntitiesState,
});

export const store = configureStore({
  reducer: rootState,
});
```

`main.tsx` file definition:

```tsx
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ModelProvider } from 'react-redux-use-model';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ModelProvider store={store}>
      <App />
    </ModelProvider>
  </Provider>
);
```

## Quick Start

You can follow [this working example](https://webblocksapp.github.io/react-redux-use-model/#/docs/quick-start).

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details.
