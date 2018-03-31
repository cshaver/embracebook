import PropTypes from 'prop-types';

export const auth = PropTypes.shape({
  isEmpty: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
});

export default auth;
