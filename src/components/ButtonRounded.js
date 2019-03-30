import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spin from './Spin';
import If from './render-utils/If';

const ButtonRounded = ({ children, medium, isLoading, ...otherProps }) => (
  <button
    type="button"
    disabled={isLoading}
    className={classnames('button-rounded', {
      'button-rounded--medium': medium,
    })}
    {...otherProps}
  >
    <If condition={isLoading}>
      <Spin white />
    </If>
    <If condition={!isLoading}>{children}</If>
  </button>
);

ButtonRounded.propTypes = {
  children: PropTypes.any.isRequired,
  medium: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ButtonRounded.defaultProps = {
  medium: false,
  isLoading: false,
};

export default ButtonRounded;
