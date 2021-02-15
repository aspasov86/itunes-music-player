import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Search from './pages/Search';
import Track from './pages/Track';

const App = () => (
  <div>
    <Menu
      secondary
      size="large"
      style={{
        height: '6vh', marginBottom: '1vh', borderBottom: '2px solid rgba(0,0,0,.6)', background: 'rgba(0,0,0,.6)'
      }}
    >
      <Menu.Item header style={{ color: '#fff' }}>
        <Icon name="apple" size="big" flipped="horizontally" />
        <div>
          iTunes
          <br />
          {' '}
          music player
        </div>
      </Menu.Item>
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
