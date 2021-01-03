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

    switchToOrderScreen = (switchScreen, order) => {
        const { user } = this.props.state;
        localStorage.setItem('order_id', order['id']);
        user.order = order;
        switchScreen(this.props, '/order')
    };
    render() {
        const { order, user } = this.props;
        const { switchScreen } = this.props;
        const formattedTime = user.getDate(order['order_placed'])
        return(
            <div style={styles.myDiv} onClick={() => this.switchToOrderScreen(switchScreen, order)}>
                <div style={styles.myRow}>
                    <Map
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={styles.mapDiv}
                        center={[order['lon'], order['lat']]}
                        zoom={[12]}
                        >
                    <Marker
                        coordinates={[order['lon'], order['lat']]}
                        anchor="center">
                        <img src={firepit} style={{width: '30px', height: '30px'}}/>
                    </Marker>
                    </Map>
                    <div style={styles.myCol}>
                        <text style={styles.infoText}>Order Status: {order['status']}</text>
                        <text style={styles.infoText}>Order Total: ${order['total']}</text>
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
        marginTop: 20,
        marginLeft: -20,
        marginRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        position: 'relative',
        height: '15vh',
        width: '100%',
        borderRadius: '10px',
        background: '#77889980',
        backdropFilter: 'blur(15px)',
    },
    mapDiv: {
        position: 'relative',
        height: '13vh',
        width: '35%',
        margin: 'auto',
        borderRadius: '10px',
    },
    myRow: {
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