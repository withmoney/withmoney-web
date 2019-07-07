import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spin from 'components/Spin';
import If from 'components/render-utils/If';

const ButtonRounded = ({
  children,
  medium,
  small,
  theme,
  isLoading,
  className,
  ...otherProps,
}) => (
  <button
    type="button"
    disabled={isLoading}
    className={classnames('button-rounded', {
      'button-rounded--medium': medium,
      'button-rounded--small': small,
      [`button-rounded--${theme}`]: theme,
    }, className)}
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
  small: PropTypes.bool,
  medium: PropTypes.bool,
  isLoading: PropTypes.bool,
  theme: PropTypes.string,
  className: PropTypes.string,
};

ButtonRounded.defaultProps = {
  medium: false,
  small: false,
  isLoading: false,
  theme: '',
  className: '',
};

export default ButtonRounded;
