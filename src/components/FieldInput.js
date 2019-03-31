import React from 'react';
import PropTypes from 'prop-types';

const FieldInput = ({ id, ...othersProps }) => (
  <div className="field">
    <input type="text" className="field__input" name={id} id={id} {...othersProps} />
  </div>
);

FieldInput.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FieldInput;
