const o=`//@ts-nocheck
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
`;export{o as default};
