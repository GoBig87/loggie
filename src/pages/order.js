import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import firepit from "../assets/images/firepit.svg";


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q',
    interactive: false,
    attributionControl: false,
    logoPosition: 'top-left',
});


class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lon: '',
            lat: '',
        }
    }


    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        const formattedTime = user.getDate(user.order['orderPlaced'])
        return(
            <Container component="main" maxWidth="lg">
                <BackGroundVideo/>
                <IconButton aria-label="back"
                            style={styles.myBack}
                            onClick={() => switchScreen(this.props, '/account')}>
                    <ArrowBack/>
                </IconButton>
                <div style={styles.myDiv}>
                    <title style={styles.myTitle}>
                        Order Information
                    </title>
                    <Map
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={styles.mapDiv}
                        center={[user.order['lon'], user.order['lat']]}
                        zoom={[12]}
                    >
                        <Marker
                            coordinates={[user.order['lon'], user.order['lat']]}
                            anchor="center">
                            <img src={firepit} style={{width: '30px', height: '30px'}}/>
                        </Marker>
                    </Map>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Bundles: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>$10 </title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Qty: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>x{user.order['quantity']}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Total: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>${user.order['total']}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Placed: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{formattedTime}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Status: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{user.order['status']}</title>
                    </div>
                </div>
            </Container>
        );
    }
}
export default OrderPage;

// styles section
let styles = {
    myDiv: {
        position: 'relative',
        marginTop: 50,
        marginLeft: 25,
        top: 'center',
        left: 'center',
        height: '90%',
        width: '90%',
        borderRadius: '10px',
        background: '#77889980',
        backdropFilter: 'blur(15px)',
    },
    myRow: {
        flexDirection:'row',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    myItemLeft: {
        flexDirection: "row",
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        margin: 'auto',
        whiteSpace: 'nowrap',
    },
    myItemRight: {
        textAlign: 'right',
        display: 'flex',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        margin: 'auto',
        whiteSpace: 'nowrap',
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
    mapDiv: {
        padding: 10,
        marginLeft: 25,
        position: 'relative',
        alignItemstems: 'center',
        justifyContent: 'center',
        height: '35vh',
        width: '90%'
    },
    myTitle: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItemstems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:10,
        marginBottom:10
    },
    myBody: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItemstems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
        marginTop:10,
        marginBottom:0
    },
    myBack: {
        position: 'fixed',
        color: 'white',
        left: 0,
        top: 5,
    },
}