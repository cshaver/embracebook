import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { map, get, filter } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import ProgressIndicator from 'components/ProgressIndicator'
import PlayerTile from './components/PlayerTile'

import classes from './index.scss'

@firebaseConnect([{ path: 'users' }])
// Map state to props
@connect(({ firebase, firebase: { auth, data: { users } } }, { params: { uid } }) => ({
  auth,
  players: users
}))
export default class PlayerList extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    firebase: PropTypes.object
  }

  render() {
    const { users, players, auth } = this.props

    if (!isLoaded(players, auth)) {
      return <ProgressIndicator />
    }

    // Player Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    return (
      <div className={classes.container}>
        <ul className={classes.tiles}>
          {!isEmpty(players) &&
            map(players, (profile, key) => (
              profile.type !== 'PLAYER' ? null : <PlayerTile
                key={`${profile.displayName}-Collab-${key}`}
                profile={profile}
              />
            ))}
        </ul>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object
  }
}
