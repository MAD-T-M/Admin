import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
//import Kintone from './kintone';

const request = require('request');

let params = {
  url: 'https://devhwdbtb.cybozu.com/k/v1/records.json?app=1&id=1',
  method: 'GET',
  json: true,
  headers: {
    'X-Cybozu-API-Token': 'FqpBPT5bTMWgaJT6HFoHfRD7Jo5KVyO7Zd9vPnNl',
  },
};

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
    lng: 136.882600,
  },{
    lat: 35.170680,
    lng: 136.883333,
  },{
    lat: 35.170680,
    lng: 136.884839,
  },{
    lat: 35.171873,
    lng: 136.884850,
  },{
    lat: 35.170600,
    lng: 136.884861,
  },{
    lat: 35.170700,
    lng: 136.884857,
  },{
    lat: 35.170450,
    lng: 136.884849,
  },
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
    const kdata = request(params, function(err, resp, body) {
      if (err) {
        console.log('eror', err);
        return;
      }
      console.log('body', body);
    });
    data.map((item) => {
     return console.log('i')
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