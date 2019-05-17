import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ searchTerm, onSubmit, onChange }) => {
  
  return (
    <form onSubmit={ onSubmit }>
      <label>Search Hacker News</label>
      <input 
        type="text"
        value={ searchTerm }
        onChange={ onChange }
      />
    </form>
  );

};

SearchForm.propTypes = {
  searchTerm: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default SearchForm;