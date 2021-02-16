import { createElement } from 'react';
import PropTypes from 'prop-types';

const InfoLine = ({
  type, info, htmlTag, ...restProps
}) => {
  let content = '[No Info]';
  switch (type) {
    case 'date':
      if (info !== 'Invalid date') content = info;
      break;
    case 'price':
      if (info > -1) content = `$${info}`;
      break;
    case 'string':
    default:
      if (info) content = info;
  }
  return createElement(htmlTag, { ...restProps }, content);
};

InfoLine.defaultProps = { htmlTag: 'div', type: 'string', info: null };

InfoLine.propTypes = {
  type: PropTypes.oneOf(['date', 'price', 'string']),
  info: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  htmlTag: PropTypes.oneOf(['div', 'span'])
};

export default InfoLine;
