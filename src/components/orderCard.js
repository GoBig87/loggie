import React, { Component } from 'react';
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import firepit from "../assets/images/firepit.svg";
import pin from "../assets/images/pin.svg";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q',
    interactive: false,
    attributionControl: false,
    logoPosition: 'top-left',
});


class OrderCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { lat, lon, pitNum, status, orderPlaced, total } = this.props;
        var date = new Date(orderPlaced * 1000);
        var month = date.getMonth();
        var day = date.getDay();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = month + '/' + day + '/' + year + ' ' +hours + ':' + minutes.substr(-2)

        return(
            <div style={styles.myDiv}>
                <div style={styles.myRow}>
                    <Map
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={styles.mapDiv}
                        center={[lon, lat]}
                        zoom={[12]}
                        >
                    <Marker
                        coordinates={[lon, lat]}
                        anchor="center">
                        <img src={firepit} style={{width: '30px', height: '30px'}}/>
                    </Marker>
                    </Map>
                    <div style={styles.myCol}>
                        <text style={styles.infoText}>Order Status: {status}</text>
                        <text style={styles.infoText}>Order Total: ${total}.00</text>
                        <text style={styles.infoText}>Order Date: {formattedTime}</text>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderCard;

let styles = {
    myDiv: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft:-20,
        position: 'relative',
        height: '115px',
        width: '100%',
        borderRadius: '10px',
        background: '#77889980',
        backdropFilter: 'blur(15px)',
    },
    mapDiv: {
        position: 'relative',
        height: '15vh',
        width: '30vw',
        margin: 'auto',
    },
    myRow: {
        padding: 10,
        margin: 'auto',
        flexDirection:'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myCol: {
        flexDirection:'column',
        margin: 'auto',
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
    },
    infoText: {
        marginTop: 2,
        paddingBottom: 2,
        flexDirection: "row",
        position: 'relative',
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
}