---
sidebar_position: 1
---

# Getting Started

**react-redux-use-model** is a library built on top of react-redux and Redux Toolkit. Its purpose is to simplify the management of global state in a React application by automatically normalizing data. This enables easy updates across multiple UI components displaying the same information without the need to duplicate information in the Redux state, which would otherwise require manual updates to each component when the state changes.

## Features

- Automatically normalizes data in the Redux state.
- Simplifies state management in React applications.
- Enables easy updates across multiple UI components.
- Built on top of react-redux and Redux Toolkit for seamless integration.

## Installation

**react-redux-use-model** requires **@reduxjs/toolkit 2.2.1 or later** and **react-redux 9.1.0 or later**. Make sure you have previously installed them, if no run the following installation command.

```bash
npm install @reduxjs/toolkit react-redux
```

After that you can install **react-redux-use-model**:

```bash
npm install react-redux-use-model
```

## Create a Redux Store

Create a file named `src/store.ts`. Then configure a Redux store using `@reduxjs/toolkit` and `react-redux-use-model`.

```typescript
import {
  configureStore,
  combineReducers as combineStates,
} from '@reduxjs/toolkit';
import { normalizedEntitiesState } from 'react-redux-use-model';

// Combining multiple state slices into a single root state
export const rootState = combineStates({
  normalizedEntitiesState,
});

// Configuring the Redux store with the combined reducer
export const store = configureStore({
  reducer: rootState,
});
```

## Initialize the Model Store with React

Inside the redux `<Provider>`, the `<ModelProvider>` is used to wrap the `<App>` component, enabling model-based state management provided by **react-redux-use-model**.

```typescript
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ModelProvider } from 'react-redux-use-model';
import store from './store';
import App from './App';

// Creating a root DOM node for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the React application within Redux providers
root.render(
  <Provider store={store}>
    <ModelProvider store={store}>
      <App />
    </ModelProvider>
  </Provider>
);
```
