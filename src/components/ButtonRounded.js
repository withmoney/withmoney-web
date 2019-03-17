import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ButtonRounded = ({ children, medium, ...otherProps }) => (
  <button
    type="button"
    className={classnames('button-rounded', {
      'button-rounded--medium': medium,
    })}
    {...otherProps}
  >
    {children}
  </button>
);

ButtonRounded.propTypes = {
  children: PropTypes.any.isRequired,
  medium: PropTypes.bool,
};

ButtonRounded.defaultProps = {
  medium: false,
};

export default ButtonRounded;
