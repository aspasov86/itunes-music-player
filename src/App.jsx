import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Search from './pages/Search';
import Track from './pages/Track';

const App = () => (
  <Router>
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/track/:trackId" component={Track} />
      <Redirect to="/search" />
    </Switch>
  </Router>
);

export default App;
