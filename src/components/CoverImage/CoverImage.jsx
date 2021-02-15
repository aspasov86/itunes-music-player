import { useState } from 'react';
import PropTypes from 'prop-types';
import Placeholder from 'semantic-ui-react/dist/commonjs/elements/Placeholder/Placeholder';

const getLargerImage = (src, size) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = `${size}x${size}bb.jpg`;
  return splitSrc.join('/');
};

const CoverImage = ({ src, size, ...restProps }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => setLoaded(true);
  return (
    <div style={{ textAlign: 'center' }}>
      <Placeholder style={{ display: loaded ? 'none' : 'block', height: size, width: size }}>
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

CoverImage.defaultProps = { size: 100 };

CoverImage.propTypes = { src: PropTypes.string.isRequired, size: PropTypes.number };

export default CoverImage;
