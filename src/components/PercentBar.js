import React from 'react';
import PropTypes from 'prop-types';

const PercentBar = ({ type, percent }) => (
  <div className={`percent-bar percent-bar--${type}`}>
    <div
      className={`percent-bar__progress percent-bar__progress--${type}`}
      style={{ width: percent }}
    />
  </div>
);

PercentBar.propTypes = {
  type: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
};

export default PercentBar;
