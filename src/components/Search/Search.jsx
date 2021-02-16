import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import styles from './Search.module.scss';

const Search = ({ searchTerm, searchHandler, loading }) => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setSearchString(searchTerm);
  }, []);

  const onSearchChange = (event, { value }) => setSearchString(value);

  return (
    <Input
      className={styles.input}
      size="big"
      loading={loading}
      value={searchString}
      icon={{
        name: 'search',
        disabled: !searchString,
        size: 'large',
        onClick: searchHandler(searchString)
      }}
      onChange={onSearchChange}
      placeholder="Search..."
    />
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  searchHandler: PropTypes.func.isRequired
};

export default Search;
