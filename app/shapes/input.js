import PropTypes from 'prop-types';

const inputShape = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.any,
  onBlur: PropTypes.function,
  onChange: PropTypes.function,
  onFocus: PropTypes.function,
});

export default inputShape;
