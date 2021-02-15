import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Search from './pages/Search';
import Track from './pages/Track';

const App = () => (
  <div>
    <Menu secondary size="large" style={{ background: 'green', height: '6vh', marginBottom: '1vh' }}>
      <Menu.Item header>iTunes music player</Menu.Item>
    </Menu>
    <Router>
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/track/:trackId" component={Track} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  </div>
);

export default App;
