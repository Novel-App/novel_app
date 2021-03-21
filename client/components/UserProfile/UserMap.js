import React from 'react'
import GoogleMapReact from 'google-map-react'
require('dotenv').config()

export default function UserMap(props) {
  let userInfo = {
    center: {
      lat: props.userLat,
      lng: props.userLong
    },
    zoom: 13
  }

  const renderMarker = (map, maps) => {
    let marker = new maps.Marker({
      position: userInfo.center,
      map,
      title: 'User Location'
    })
    return marker
  }
  const renderCircle = (map, maps) => {
    let circle = new maps.Circle({
      center: userInfo.center,
      map,
      radius: 3000,
      strokeColor: 'deepskyblue',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'deepskyblue',
      fillOpacity: 0.35
    })
    return circle
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
          renderCircle(map, maps)
        }}
      />
    </div>
  )
}
