import PropTypes from 'prop-types';

const Track = ({ match }) => {
  console.log('match', match);
  return <div>Something</div>;
};

Track.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Track;
