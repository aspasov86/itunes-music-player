import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';
import styles from './Layout.module.scss';

const Layout = ({ children, ...restProps }) => {
  const { isLaptopDevice, isDesktopDevice } = useScreenWidth();

  return (isLaptopDevice || isDesktopDevice) ? (
    <Container {...restProps}>{children}</Container>
  ) : (
    <div className={styles.div} {...restProps}>{children}</div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default Layout;
