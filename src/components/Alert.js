import React from 'react';
import PropTypes from 'prop-types';

import 'styles/_alert.scss';

const Alert = ({ message }) => {
  if (!message.length) return null;

  return <div className="alert">{message}</div>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
