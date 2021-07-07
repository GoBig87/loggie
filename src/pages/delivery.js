import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import firepit from "../assets/images/firepit.svg";
import pin from "../assets/images/pin.svg";
import UserLocation from "../assets/images/UserLocation.svg";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q',
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class DeliveryPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lng: -117.2363,
            lat: 32.7764,
            zoom: 11,
            pitLon: '',
            pitLat: '',
            pitNum: 'No pit selected',
            userLat: 0,
            userLon: 0,
            pinLat: null,
            pinLon: null,
            open: false,
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
        this.firePit28 = {pitNum: 28, loc: [-117.235322, 32.771573]};
        this.firePit29 = {pitNum: 29, loc: [-117.235509, 32.771549]};
        this.firePit30 = {pitNum: 30, loc: [-117.236058, 32.771828]};
        this.firePit31 = {pitNum: 31, loc: [-117.236572, 32.772270]};
        this.firePit32 = {pitNum: 32, loc: [-117.237479, 32.772096]};
        this.firePit33 = {pitNum: 33, loc: [-117.237896, 32.771351]};
        this.firePit34 = {pitNum: 34, loc: [-117.238889, 32.771030]};
        this.firePit35 = {pitNum: 35, loc: [-117.239231, 32.771109]};
        this.firePit36 = {pitNum: 36, loc: [-117.239987, 32.771591]};
        this.firePit37 = {pitNum: 37, loc: [-117.240151, 32.771925]};
        this.firePit38 = {pitNum: 38, loc: [-117.239987, 32.771591]};
        this.firePit39 = {pitNum: 39, loc: [-117.240140, 32.772243]};
        this.firePit40 = {pitNum: 40, loc: [-117.241993, 32.775068]};
        this.firePit41 = {pitNum: 41, loc: [-117.242244, 32.775661]};
        this.firePit42 = {pitNum: 42, loc: [-117.242250, 32.775942]};
        this.firePit43 = {pitNum: 43, loc: [-117.242237, 32.776290]};
        this.firePit44 = {pitNum: 44, loc: [-117.242069, 32.776554]};
        this.firePit45 = {pitNum: 45, loc: [-117.240805, 32.777300]};
        this.firePit46 = {pitNum: 46, loc: [-117.240110, 32.777388]};
        this.firePit47 = {pitNum: 47, loc: [-117.239637, 32.777391]};
        this.firePit48 = {pitNum: 48, loc: [-117.238830, 32.776886]};
        this.firePit49 = {pitNum: 49, loc: [-117.238805, 32.776596]};
        this.firePit50 = {pitNum: 50, loc: [-117.238680, 32.776232]};
        this.firePit51 = {pitNum: 51, loc: [-117.238195, 32.775899]};
        this.firePit52 = {pitNum: 52, loc: [-117.237941, 32.775851]};
        this.firePit53 = {pitNum: 53, loc: [-117.237616, 32.775925]};
        this.firePit54 = {pitNum: 54, loc: [-117.237324, 32.776038]};
        this.firePitArray = [
            this.firePit1, this.firePit2, this.firePit3, this.firePit4,
            this.firePit5, this.firePit6, this.firePit7, this.firePit8,
            this.firePit9, this.firePit10, this.firePit11, this.firePit12,
            this.firePit13, this.firePit14, this.firePit15, this.firePit16,
            this.firePit17, this.firePit18, this.firePit19, this.firePit20,
            this.firePit21, this.firePit22, this.firePit23, this.firePit24,
            this.firePit25, this.firePit26, this.firePit27, this.firePit28,
            this.firePit29, this.firePit30, this.firePit31, this.firePit32,
            this.firePit33, this.firePit34, this.firePit35, this.firePit36,
            this.firePit37, this.firePit38, this.firePit39, this.firePit40,
            this.firePit41, this.firePit42, this.firePit43, this.firePit44,
            this.firePit45, this.firePit46, this.firePit47, this.firePit48,
            this.firePit49, this.firePit50, this.firePit51, this.firePit52,
            this.firePit53, this.firePit54,
        ];
    };
    setUserLocation = (position) => {
        this.setState({
            userLat: position.coords.latitude,
            userLon: position.coords.longitude,
            lng: position.coords.longitude,
            lat: position.coords.latitude
        })
    };
    centerOnLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation)
        } else {
            console.log("Not Available");
        }
    };
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
    };
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
    };
    switchScreenCheck = () => {
        const pinLon = this.state.pinLon;
        const pinLat = this.state.pinLat;
        if([pinLat, pinLat].includes(null)){
            this.setState({open: true});
        }else{
            const { switchScreen } = this.props.state;
            switchScreen(this.props, '/payment');
        }
    }
    render() {
        const { switchScreen, user } = this.props.state;

        if(user.quantity == 0){
            switchScreen(this.props, '/menu')
        };

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

        const handleClose = () => {
            this.setState({open: false});
        };

        return(
            <Container component="main" maxWidth="sm">
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
                <div style={styles.myDiv}>
                    <text style={styles.infoText}>Select Fire Pit</text>
                    <text style={styles.myItemLeft}>Fire Pit: {this.state.pitNum}</text>
                    <text style={styles.myItemLeft}>Latitude: {this.state.pitLat}</text>
                    <text style={styles.myItemLeft}>Longitude: {this.state.pitLon}</text>
                </div>
                    <Button id={'paymentButton'} style={styles.myButton} onClick={() => this.switchScreenCheck()}>
                        Proceed to Payment
                    </Button>
                <IconButton aria-label="center"
                            style={styles.myCenter}
                            onClick={() => this.centerOnLocation()}>
                    <GpsFixed/>
                </IconButton>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Drop a Pin on a fire pit or Current Location
                    </Alert>
                </Snackbar>
            </Container>
        );
    }

}

export default DeliveryPage;

let styles = {
    mapDiv: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 0,
        left: 0,
        objectFit: 'cover',
        height: '100vh',
        width: '100vw'
    },
    myCenter: {
        position: 'fixed',
        color: 'white',
        right: 15,
        top: 15,
    },
    myRow: {
        position: 'absolute',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        flexDirection: "row",
        marginBottom: 20,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    myButton: {
        position: 'fixed',
        bottom: 25,
        width: "80%",
        backgroundColor:"#fff59d",
        borderRadius:25,
        height:50,
        left: 0,
        right: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    myItemLeft: {
        position: 'relative',
        flexDirection: "row",
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft:0,
        marginTop: 10,
    },
    myDiv: {
        marginTop: 25,
        marginBottom: 10,
        marginLeft:0,
        position: 'relative',
        height: '100%',
        width: '100%',
    },
}
