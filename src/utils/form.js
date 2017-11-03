export const required = value => (value ? undefined : 'Required')

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const validateSlug = value => {
	console.log('validateSlug', value)
  return value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value)
    ? 'Invalid slug format'
    : undefined
  }
