import PropTypes from 'prop-types';

const If = ({ condition, children }) => (
  condition ? children : null
);

If.propTypes = {
  condition: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default If;
