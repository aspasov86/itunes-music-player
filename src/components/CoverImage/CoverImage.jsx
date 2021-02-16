import { useState } from 'react';
import PropTypes from 'prop-types';
import Placeholder from 'semantic-ui-react/dist/commonjs/elements/Placeholder/Placeholder';
import styles from './CoverImage.module.scss';

const getLargerImage = (src, size) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = `${size}x${size}bb.jpg`;
  return splitSrc.join('/');
};

const CoverImage = ({ src, size, ...restProps }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => setLoaded(true);
  return (
    <div className={styles.coverImage}>
      <Placeholder style={{ display: loaded ? 'none' : 'block', width: size, height: size }}>
        <Placeholder.Image />
      </Placeholder>
      <img
        src={getLargerImage(src, size)}
        alt="cover"
        onLoad={onLoad}
        style={{ display: loaded ? 'inline-block' : 'none' }}
        {...restProps}
      />
    </div>
  );
};

CoverImage.defaultProps = { src: '', size: 100 };

CoverImage.propTypes = { src: PropTypes.string, size: PropTypes.number };

export default CoverImage;
