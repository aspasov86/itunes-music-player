import { createElement } from 'react';
import PropTypes from 'prop-types';
import { constructDuration, constructReleaseDate } from '../../utlis/helpers';

const InfoLine = ({
  type, info, htmlTag, contentOnly, ...restProps
}) => {
  let content = '[No Info]';
  switch (type) {
    case 'date': {
      const date = constructReleaseDate(info);
      if (date) content = date;
      break;
    }
    case 'price':
      if (![null, undefined].includes(info) && info > -1) content = `$${info}`;
      break;
    case 'duration': {
      const duration = constructDuration(info);
      if (duration) content = duration;
      break;
    }
    case 'string':
    default:
      if (info) content = info;
  }
  return contentOnly ? content : createElement(htmlTag, { ...restProps }, content);
};

InfoLine.defaultProps = {
  htmlTag: 'div', type: 'string', info: null, contentOnly: false
};

InfoLine.propTypes = {
  type: PropTypes.oneOf(['date', 'price', 'string', 'duration']),
  info: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  htmlTag: PropTypes.oneOf(['div', 'span']),
  contentOnly: PropTypes.bool
};

export default InfoLine;
