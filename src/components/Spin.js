import React from 'react';
import PropTypes from 'prop-types';

const Spin = ({ white }) => {
  const color = white ? 'white' : 'black';

  return (
    <img src={`/static/img/spin-${color}.svg`} alt="spin" className="spin" />
  );
};

Spin.propTypes = {
  white: PropTypes.bool,
};

Spin.defaultProps = {
  white: false,
};

export default Spin;
