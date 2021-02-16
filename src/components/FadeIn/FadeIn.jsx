import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';

const FadeIn = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  return (
    <Transition visible={visible} animation="fade in" duration={500}>
      {children}
    </Transition>
  );
};

FadeIn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default FadeIn;
