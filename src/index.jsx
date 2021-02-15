import ReactDOM from 'react-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
