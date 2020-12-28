import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import {GpsFixed, Add, Apple, ShoppingCart, ArrowBack} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import firepit from "../assets/images/firepit.svg";
import pin from "../assets/images/pin.svg";
import UserLocation from "../assets/images/UserLocation.svg";
import BackGroundVideo from '../components/backGroundVideo'


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q'
});

class DeliveryPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lng: -117.2353,
            lat: 32.7764,
            zoom: 11,
            pitLon: '',
            pitLat: '',
            pitNum: 'No pit selected',
            userLat: 0,
            userLon: 0,
            pinLat: 0,
            pinLon: 0
        };
        this.user = this.props.state.user;
        this.firePit1 = {pitNum: 1, loc: [-117.231963, 32.787912]};
        this.firePit2 = {pitNum: 2, loc: [-117.231883, 32.787569]};
        this.firePit3 = {pitNum: 3, loc: [-117.231829, 32.787275]};
        this.firePit4 = {pitNum: 4, loc: [-117.231808, 32.786745]};
        this.firePit5 = {pitNum: 5, loc: [-117.231793, 32.786280]};
        this.firePit6 = {pitNum: 6, loc: [-117.231822, 32.785870]};
        this.firePit7 = {pitNum: 7, loc: [-117.231945, 32.785201]};
        this.firePit8 = {pitNum: 8, loc: [-117.232166, 32.784686]};
        this.firePit9 = {pitNum: 9, loc: [-117.232413, 32.783914]};
        this.firePit10 = {pitNum: 10, loc:  [-117.232619, 32.783234]};
        this.firePit11 = {pitNum: 11, loc: [-117.233385, 32.782058]};
        this.firePit12 = {pitNum: 12, loc: [-117.233602, 32.781725]};
        this.firePit13 = {pitNum: 13, loc: [-117.233741, 32.781479]};
        this.firePit14 = {pitNum: 14, loc: [-117.233851, 32.781323]};
        this.firePit15 = {pitNum: 15, loc: [-117.234273, 32.778276]};
        this.firePit16 = {pitNum: 16, loc: [-117.233490, 32.778587]};
        this.firePit17 = {pitNum: 17, loc: [-117.232940, 32.778909]};
        this.firePit18 = {pitNum: 18, loc: [-117.232576, 32.777672]};
        this.firePit19 = {pitNum: 19, loc: [-117.232886, 32.776935]};
        this.firePit20 = {pitNum: 20, loc: [-117.232982, 32.776619]};
        this.firePit21 = {pitNum: 21, loc: [-117.233123, 32.775850]};
        this.firePit22 = {pitNum: 22, loc: [-117.233183, 32.775546]};
        this.firePit23 = {pitNum: 23, loc: [-117.233198, 32.775171]};
        this.firePit24 = {pitNum: 24, loc: [-117.233139, 32.774458]};
        this.firePit25 = {pitNum: 25, loc: [-117.236331, 32.777793]};
        this.firePit26 = {pitNum: 26, loc: [-117.237041, 32.777457]};
        this.firePit27 = {pitNum: 27, loc: [-117.237041, 32.777457]};
        this.firePitArray = [
            this.firePit1, this.firePit2, this.firePit3, this.firePit4,
            this.firePit5, this.firePit6, this.firePit7, this.firePit8,
            this.firePit9, this.firePit10, this.firePit11, this.firePit12,
            this.firePit13, this.firePit14, this.firePit15, this.firePit16,
            this.firePit17, this.firePit18, this.firePit19, this.firePit20,
            this.firePit21, this.firePit22, this.firePit23, this.firePit24,
            this.firePit25, this.firePit26, this.firePit27
        ];
    }
    setUserLocation = (position) => {
        this.setState({
            userLat: position.coords.latitude,
            userLon: position.coords.longitude,
            lng: position.coords.longitude,
            lat: position.coords.latitude
        })
    }
    centerOnLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation)
        } else {
            console.log("Not Available");
        }
    }
    setUserDelivery = (user) => {
        console.log('user location selected')
        user.lon = this.state.userLon;
        user.lat = this.state.userLat;
        this.setState({
            pitLat: user.lat,
            pitLon: user.lon,
            pitNum: ' Current Location',
            pinLat: user.lat,
            pinLon: user.lon,
        })
    }
    setFirePit = (user, firePit) => {
        console.log('fire pit selected')
        console.log(firePit)
        user.lon = firePit['loc'][0];
        user.lat = firePit['loc'][1];
        user.pitNum = firePit['pitNum'];
        this.setState({
            pitLat: user.lat,
            pitLon: user.lon,
            pitNum: ' #' + user.pitNum,
            pinLat: user.lat,
            pinLon: user.lon,
            lng: user.lon,
            lat: user.lat,
        })
    }

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;

        let markerList = this.firePitArray.map((item,index)=>{
            return  <li>
                        <Marker
                            key={item['pitNum']}
                            coordinates={item['loc']}
                            anchor="center"
                            onClick={() => this.setFirePit(user, item)}>
                            <img src={firepit} style={{width: '30px', height: '30px'}}/>
                        </Marker>
                    </li>
        })
        return(
            <Container className="main" component="main" maxWidth="xs">
                <Map
                    style="mapbox://styles/mapbox/dark-v10"
                    containerStyle={styles.mapDiv}
                    center={[this.state.lng, this.state.lat]}
                    zoom={[14]}
                >
                    <ul>
                        {markerList}
                    </ul>
                    <Marker
                        coordinates={[this.state.pinLon, this.state.pinLat]}
                        anchor="bottom">
                        <img src={pin} style={{width: '30px', height: '30px'}}/>
                    </Marker>
                    <Marker
                        coordinates={[this.state.userLon, this.state.userLat]}
                        anchor="center"
                        onClick={() => this.setUserDelivery(user)}>
                        <img src={UserLocation} style={{width: '30px', height: '30px'}}/>
                    </Marker>
                </Map>
                <IconButton aria-label="back"
                            style={styles.myBack}
                            onClick={() => switchScreen(this.props, '/menu')}>
                    <ArrowBack/>
                </IconButton>
                <IconButton aria-label="center"
                            style={styles.myCenter}
                            onClick={() => this.centerOnLocation()}>
                    <GpsFixed/>
                </IconButton>
                    <text style={styles.infoText}>Select Fire Pit for Delivery</text>
                    <text style={styles.myItemLeft}>Fire Pit: {this.state.pitNum}</text>
                    <text style={styles.myItemLeft}>Latitude: {this.state.pitLat}</text>
                    <text style={styles.myItemLeft}>Longitude: {this.state.pitLon}</text>
                <div style={styles.myRow}>
                    <Button id={'paymentButton'} style={styles.myButton} onClick={() => switchScreen(this.props, '/payment')}>
                        Proceed to Payment
                    </Button>
                </div>
            </Container>
        );
    }

}

export default DeliveryPage;

let styles = {
    mapDiv: {
        position: 'fixed',
        top: 0,
        left: 0,
        objectFit: 'cover',
        height: '100vh',
        width: '100vw'
    },
    myCenter: {
        position: 'fixed',
        color: 'white',
        right: 0,
        top: 0,
    },
    myBack: {
        position: 'fixed',
        color: 'white',
        left: 0,
        top: 0,
    },
    myRow: {
        flexDirection:'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 20,
        paddingBottom: 20,
        flexDirection: "row",
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    myButton: {
        position: 'absolute',
        bottom: 50,
        width:"80%",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
    },
    myItemLeft: {
        position: 'relative',
        flexDirection: "row",
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft:-40,
        marginTop: 10,
    },
}
