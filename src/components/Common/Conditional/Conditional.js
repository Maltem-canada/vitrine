import PropTypes from 'prop-types';

const Conditional = (props) => {
  const { test, children } = props;
  return test && children;
};

Conditional.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Conditional;
