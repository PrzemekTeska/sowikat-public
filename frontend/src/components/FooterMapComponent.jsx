import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = props => (
    <React.Fragment>
      <div
        style={{
          border: "0px solid white",
          borderRadius: 0,
          height: 0,
          width: 0
        }}
      />
      {/* Below is info window component */}
      {props.show && (
        <div
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'white',
            borderRadius: "5px",
            textAlign: "left"
          }}
        ><p style={{
            marginLeft: "5px",
            paddingTop: "5px"
        }}><b>Domki Lubiatowo</b><br/>ul. Zawilca 15<br/>84-210 Lubiatowo</p></div>
      )}
    </React.Fragment>
  )

class FooterMapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    static defaultProps = {
        center: { lat: 54.8031493, lng: 17.872188 },
        zoom: 15
    };

    

    _onChildClick = (key, childProps) => {
        this.setState({show: !this.state.show})
      }

    renderMarkers(map, maps) {
        let marker = new maps.Marker({
            position: this.props.center,
            map
        });
    }

    render() {
        return (
            <div id="footer-map"
            style={{ height: '22vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "API KEY"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                    yesIWantToUseGoogleMapApiInternals
                    onChildClick={this._onChildClick}
                >
                    <Marker 
                    lat={this.props.center.lat}
                    lng={this.props.center.lng}
                    show={this.state.show}/>
                </GoogleMapReact>
            </div>

        );
    }
}

export default FooterMapComponent;