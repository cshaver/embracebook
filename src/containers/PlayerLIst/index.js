import React, { Component, cloneElement } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { map, get, filter } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import { PLAYER_TYPE } from 'constants'
import ProgressIndicator from 'components/ProgressIndicator'
import PlayerTile from './components/PlayerTile'
import NoAccess from 'components/NoAccess'

import classes from './index.scss'

class PlayerList extends Component {
  render() {
    const { users, players, auth, profile } = this.props

    if (!isLoaded(players, auth)) {
      return <ProgressIndicator />
    }

    // Player Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    if (profile.type === PLAYER_TYPE) {
      return (<NoAccess />)
    }

    return (
      <div className={classes.container}>
        <ul className={classes.tiles}>
          {!isEmpty(players) &&
            map(players, (profile, key) => (
              profile.type !== PLAYER_TYPE ? null : <PlayerTile
                key={`${profile.displayName}-Collab-${key}`}
                profile={profile}
              />
            ))}
        </ul>
      </div>
    )
  }
}

PlayerList.contextTypes = {
  router: PropTypes.object.isRequired,
  firebase: PropTypes.object
}

PlayerList.propTypes = {
  children: PropTypes.object,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object
}

export default compose(
  firebaseConnect([{ path: 'users' }]),
  // Map state to props
  connect(({ firebase, firebase: { auth, profile, data: { users } } }, { params: { uid } }) => ({
    auth,
    profile,
    players: users
  }))
)(PlayerList)
