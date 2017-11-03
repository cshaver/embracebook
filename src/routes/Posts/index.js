import { POST_LIST_PATH as path } from 'constants'

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Posts = require('./containers/PostsContainer').default

        /*  Return getComponent   */
        cb(null, Posts)

        /* Webpack named bundle   */
      },
      'Posts'
    )
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Post = require('./routes/Post').default

      /*  Return getComponent   */
      cb(null, [Post(store)])
    })
  }
})
