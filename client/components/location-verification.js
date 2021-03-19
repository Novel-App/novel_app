/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMapReact from 'google-map-react'
require('dotenv').config()
import {updateUser} from '../store/user'

class LocationVerification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null
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
    console.log('GEOLOCATION', position)
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
      updateUser({
        ...this.props.user,
        coordinates: [this.state.latitude, this.state.longitude]
      })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.getLocation}>Verify location</button>
        {/* <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p> */}
        <UserMap
          userLat={this.state.latitude}
          userLong={this.state.longitude}
        />
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

export const UserMap = props => {
  let userInfo = {
    center: {
      lat: props.userLat,
      lng: props.userLong
    },
    zoom: 14
  }

  const renderMarker = (map, maps) => {
    let marker = new maps.Marker({
      position: userInfo.center,
      map,
      title: 'User Location'
    })
    return marker
  }
  return (
    <div className="user-map" style={{height: '600px', width: '600px'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.API_KEY}}
        center={userInfo.center}
        defaultZoom={userInfo.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({map, maps}) => {
          renderMarker(map, maps)
        }}
      />
    </div>
  )
}
