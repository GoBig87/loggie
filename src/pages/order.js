import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import firepit from "../assets/images/firepit.svg";
import axios from "axios";


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
            order: {
                lon: '',
                lat: '',
                quantity: '',
                total: '',
                status: '',
            },
            formattedTime: '',
            orderSet: false,
        }
    }

    getOrdersRsp = (order_list) => {
        const { user } = this.props.state;
        user.orders = order_list;
        const order_id = localStorage.getItem('order_id');
        let tempOrder = {};
        for (let i = 0; i < order_list.length; i++){
            if(order_list[i]['id'] == order_id){
                user.order = order_list[i]
                const formattedTime = user.getDate(user.order['order_placed'])
                this.setState({order: user.order, orderSet: true, formattedTime: formattedTime})
            }
        }
    }
    render() {
        const { user } = this.props.state;
        if(!(this.state.orderSet)) {
            if (user.order == null) {
                const config = user.config();
                axios
                    .get("https://loggie.app/api/order/", config)
                    .then(res => this.getOrdersRsp(res.data))
                    .catch(err => console.log(err));
            } else {
                const formattedTime = user.getDate(user.order['order_placed'])
                this.setState({order: user.order, orderSet: true, formattedTime: formattedTime});
            }
        }
        return(
            <Container component="main" maxWidth="sm">
                <BackGroundVideo/>
                <div style={styles.myDiv}>
                    <title style={styles.myTitle}>
                        Order Information
                    </title>
                    <Map
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={styles.mapDiv}
                        center={[this.state.order['lon'], this.state.order['lat']]}
                        zoom={[12.75]}
                    >
                        <Marker
                            coordinates={[this.state.order['lon'], this.state.order['lat']]}
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
                        <title style={styles.myItemRight}>x{this.state.order['quantity']}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Total: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>${this.state.order['total']}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Placed: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{this.state.formattedTime}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Status: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{this.state.order['status']}</title>
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
        paddingTop: 20,
        paddingBottom: 20,
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
        marginLeft: 25,
        marginRight: 25
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
        margin: 'auto',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
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
}