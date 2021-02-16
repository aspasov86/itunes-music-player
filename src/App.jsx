import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Menu from './components/Menu/Menu';
import Search from './pages/Search';
import Track from './pages/Track';

const App = () => (
  <Suspense fallback={null}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Menu />
          <main>
            <Router>
              <Switch>
                <Route path="/search" component={Search} />
                <Route path="/track/:trackId" component={Track} />
                <Redirect to="/search" />
              </Switch>
            </Router>
          </main>
        </div>
      </PersistGate>
    </Provider>
  </Suspense>
);

export default App;
