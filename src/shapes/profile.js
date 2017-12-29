import PropTypes from 'prop-types';

export const roles = PropTypes.shape({
  admin: PropTypes.bool,
  storyteller: PropTypes.bool,
  player: PropTypes.bool,
});

const profile = PropTypes.shape({
  roles,
});

export default profile;
