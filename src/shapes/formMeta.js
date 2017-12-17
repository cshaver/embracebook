import PropTypes from 'prop-types';

const formMetaShape = PropTypes.shape({
  error: PropTypes.string,
  dirty: PropTypes.bool,
  submitFailed: PropTypes.bool,
});

export default formMetaShape;
