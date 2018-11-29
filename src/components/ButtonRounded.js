import React from 'react';
import PropTypes from 'prop-types';

const ButtonRounded = ({ children, ...otherProps }) => (
  <button
    type="button"
    className="button-rounded"
    {...otherProps}
  >
    {children}
  </button>
);

ButtonRounded.propsTypes = {
  children: PropTypes.any.isRequired,
};

export default ButtonRounded;
