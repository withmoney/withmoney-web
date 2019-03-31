import React from 'react';
import PropTypes from 'prop-types';

const FieldButton = ({ children, ...othersProps }) => (
  <div className="field">
    <button type="button" className="button" {...othersProps}>
      {children}
    </button>
  </div>
);

FieldButton.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FieldButton;
