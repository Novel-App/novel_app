import React from 'react'
import GoogleMapReact from 'google-map-react'
require('dotenv').config()

export default function UserMap(props) {
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
