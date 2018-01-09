export const required = value => (value ? undefined : 'Required');

export const validateEmail = value =>
  (value && !/^.+@.+$/i.test(value)
    ? 'Invalid email address'
    : undefined);

export const validateSlug = value => (value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value)
  ? 'Invalid slug format'
  : undefined);
