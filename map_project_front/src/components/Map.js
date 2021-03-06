import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, findLocation, setLocation, setMarker } from '../actions/actions'

const MapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={16}
    center={props.center}
    options={{
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    }}
    onClick={props.onMapClick}
  >
    <Marker
      {...props.marker}
    />
  </GoogleMap>
))

class Map extends Component {
  handleMapLoad = this.handleMapLoad.bind(this)
  handleMapClick = this.handleMapClick.bind(this)

  handleMapLoad(map) {
    this._mapComponent = map
    this.props.getUser()
    this.props.findLocation()
    this.props.setLocation(this.props.user.lat, this.props.user.lng)
  }

  handleMapClick(event) {
    const markerLat = event.latLng.lat()
    const markerLng = event.latLng.lng()

    this.props.setMarker(markerLat, markerLng)
  }

  render() {
    return (
      <div style={{height: `600px`}}>
        <MapWrapper
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          center={{lat: this.props.user.lat, lng: this.props.user.lng}}
          marker={this.props.marker}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
    findLocation,
    setLocation,
    setMarker
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
