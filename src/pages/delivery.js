import React, { Component, useState } from "react";
import firewood from "../assets/images/firewood.png"
import { IconButton, Button, Card } from "@material-ui/core";
import {GpsFixed, Add, Apple, ShoppingCart, ArrowBack} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Fireplace from "../assets/videos/Fireplace.mp4";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import './menu.css'
import mapboxgl from 'mapbox-gl';


class DeliveryPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lng: -117.2353,
            lat: 32.7764,
            zoom: 11,
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        return(
            <Container className="main" component="main" maxWidth="xs">
                <div className="player">
                    <video autoPlay muted loop className="video">
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                    <IconButton aria-label="back"
                                style={styles.myBack}
                                onClick={() => switchScreen(this.props, '/menu')}>
                        <ArrowBack/>
                    </IconButton>
                    <div className="wrap">
                        <title className="firewood"
                               style={styles.myTitle}>
                            Contact Info
                        </title>
                        <></>
                        <text style={styles.infoText}>
                            Phone Number for delivery contact
                        </text>
                        <div style={styles.phoneDiv}>
                        <PhoneInput
                            inputStyle={{
                                width: '100%'
                            }}
                            country={'us'}
                            value={this.state.phone}
                            onChange={phone => this.setState({ phone })}/>
                        </div>
                        <text style={styles.infoText}>Delivery Coordinates</text>
                        <div style={styles.myRow}>
                            <text style={styles.myItemLeft}>Lat: {this.state.lat}</text>
                            <text style={styles.myItemRight}>Lng: {this.state.lng}</text>
                        </div>
                       <div style={styles.mapDiv}>
                            <div ref={el => this.mapContainer = el} className="mapContainer" />
                        </div>
                        <div style={styles.myRow}>
                            <Button style={styles.myButton} onClick={() => switchScreen(this.props, '/payment')}>
                                Proceed to Payment
                            </Button>
                        </div>

                    </div>
                </div>
            </Container>
        );
    }

}

export default DeliveryPage;

let styles = {
    phoneDiv: {
        position: 'relative',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: "90%",
    },
    mapDiv: {
        position: 'relative',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: "90%",
        height: "25%",
        marginBottom: 'auto',
    },
    myPhone: {
        width: "80%"
    },
    submitLocation:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center",
        marginTop:0,
        marginBottom:50,
    },
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myCart: {
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
        marginBottom: 2
    },
    icon: {
        fontSize: 40,
        marginLeft:-50,
        marginRight:20,
        height:50,
        marginTop:-15,
        marginBottom:-15
    },
    myIcon: {
        flexDirection:'row',
        position: 'relative',
        color: 'white',
    },
    myTitle: {
        flexDirection: "row",
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:30,
        marginBottom:10
    },
    infoText: {
        marginTop: 20,
        flexDirection: "row",
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    myItemLeft: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft:10,
        marginBottom: 5,
        marginRight: 5
    },
    myItemRight: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        marginBottom: 5,
        marginLeft: 5
    },
    coloredLine: {
        position: 'relative',
        marginTop: 25,
        width: "90%",
        color: 'white',
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        height: 1
    },
    myButton: {
        position: 'absolute',
        bottom: 0,
        width:"80%",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50,
        marginBottom:50
    },
    pos: {
        marginBottom: 12,
    },
}
