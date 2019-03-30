import React from 'react';
import PropTypes from 'prop-types';

const InputInline = ({ isEditing, defaultValue, isHTML, ...othersProps }) =>
  isEditing ? <input defaultValue={defaultValue} {...othersProps} /> : defaultValue;

InputInline.propTypes = {
  type: PropTypes.string,
  isHTML: PropTypes.bool,
  isEditing: PropTypes.bool,
  defaultValue: PropTypes.any.isRequired,
};

InputInline.defaultProps = {
  isHTML: false,
  isEditing: true,
  type: 'text',
};

export default InputInline;
