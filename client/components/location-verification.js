/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/user'
import UserMap from './UserProfile/UserMap'
import {Link} from 'react-router-dom'

class LocationVerification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      verified: false
    }
    this.getLocation = this.getLocation.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)
    this.handleLocationError = this.handleLocationError.bind(this)
    this.addLocation = this.addLocation.bind(this)
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }
  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.addLocation()
  }
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.')
        break
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.')
        break
      case error.TIMEOUT:
        alert('The request to get user location timed out.')
        break
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.')
        break
      default:
        alert('An unknown error occurred.')
    }
  }
  addLocation() {
    if (this.state.latitude && this.state.longitude) {
      this.props.updateUser({
        ...this.props.user,
        coordinates: [this.state.latitude, this.state.longitude]
      })
      this.setState({verified: true})
    }
  }

  render() {
    console.log('LAT LNG', this.state.latitude, this.state.longitude)
    return (
      <div className="d-flex-column justify-content-center align-items-center">
        <h1>Verify your location</h1>
        {/* info icon to hover ==> explaining 'why do i need to verify my location?' */}
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={this.getLocation}
        >
          Get location
        </button>
        <UserMap
          userLat={this.state.latitude}
          userLong={this.state.longitude}
        />
        {this.state.verified && (
          <Link to="/products">
            <button className="btn btn-outline-dark" type="button">
              Confirm
            </button>
          </Link>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: userInfo => dispatch(updateUser(userInfo))
  }
}

export default connect(mapState, mapDispatch)(LocationVerification)
