import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded
  // populate
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import ProgressIndicator from 'components/ProgressIndicator'
import AccountForm from '../components/AccountForm/AccountForm'
import classes from './AccountContainer.scss'

@UserIsAuthenticated
@firebaseConnect()
@connect(({ firebase: { profile, auth } }) => ({
  profile
  // authUid: auth.uid
  // profile: populate(firebase, 'profile', rfConfig.profileParamsToPopulate) // if populating profile
}))
export default class Account extends Component {
  updateAccount = newData => {
    delete newData.isLoaded
    delete newData.isEmpty

    return this.props.firebase
      .updateProfile(newData)
      .catch(err => {
        console.error('Error updating account', err) // eslint-disable-line no-console
      })
      .then(() => console.groupEnd())
  }

  render() {
    const { profile } = this.props

    console.group('AccountContainer::render')
    console.log(profile)
    console.groupEnd()

    if (!isLoaded(profile)) {
      return <ProgressIndicator />
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.pane}>
          <div className={classes.settings}>
            <div className={classes.avatar}>
              <img
                className={classes.avatarCurrent}
                src={(profile && profile.avatarUrl) || `https://api.adorable.io/avatars//${profile && profile.email}`}
                onClick={this.toggleModal}
              />
            </div>
            <div className={classes.meta}>
              <AccountForm
                initialValues={profile}
                account={profile}
                onSubmit={this.updateAccount}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }

  static propTypes = {
    profile: PropTypes.object,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }
}
