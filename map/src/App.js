import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const data = [
  {
    lat: 35.171996,
    lng: 136.88463,
  },
  {
    lat: 35.170680,
    lng: 136.884844,
  },{
    lat: 35.171873,
    lng: 136.882527,
  }
]

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXb0KtfhHlwuFK2uHKMDx-ElE3GQahOaQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 35.170915, lng: 136.881537 }}
  >
    {data.map((item) => {
     return <Marker position={{ lat: item.lat, lng: item.lng }} onClick={props.onMarkerClick} />
    })}
  </GoogleMap>
)

export default class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    data.map((item) => {
     return console.log('i', item)
    })
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div>
        <h1>管理者画面</h1>
        <div>
          <h1 style={{fontSize: '20px'}}>駐輪違反マップ</h1>
          <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
      </div>
    )
  }
}