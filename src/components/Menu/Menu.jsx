import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import styles from './Menu.module.scss';

const MenuBar = () => (
  <Menu
    secondary
    size="large"
    className={styles.menu}
  >
    <Container>
      <Menu.Item header>
        <Icon name="apple" size="big" flipped="horizontally" />
        <div>
          iTunes
          <br />
          {' '}
          music player
        </div>
      </Menu.Item>
    </Container>
  </Menu>
);

export default MenuBar;
