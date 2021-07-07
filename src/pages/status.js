import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import firepit from "../assets/images/firepit.svg";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q',
    interactive: false,
    attributionControl: false,
    logoPosition: 'top-left',
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


class StatusPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lon: 0,
            lat: 0,
            quantity: 'No Data',
            total: 'No Data',
            status: 'No Data',
            open: false,
            alertOpen: false,
            formattedTime: '',
            orderSet: false,
        }
        this.patchOrderStatus()
    }

    patchOrderStatus = () => {
        const id = this.props.match.params.id;
        const status = this.props.match.params.status;
        const data = {'order_id': id, 'status': status};
        const { user } = this.props.state;
        const config = user.config();
        axios
            .patch("https://loggie.app/api/order/", data, config)
            .then(res => this.patchOrderRsp(res.data))
            .catch(err => this.patchOrderErr(err));
    };
    patchOrderRsp = (rsp) => {
        this.setState(
          {lon: parseFloat(rsp['lon']),
                 lat: parseFloat(rsp['lat']),
                 quantity: rsp['quantity'],
                 total: rsp['total'],
                 status: rsp['status'],
          }
        )
    };
    patchOrderErr = (err) => {
        this.setState({alertOpen: true});
    };
    render() {
        const handleAlertClose = () => {
            this.setState({
                alertOpen: false,
            });
        };
        const handleClose = () => {
            if(this.state.allowClose){
                this.setState({open: false})
            }
        };
        return(
            <Container component="main" maxWidth="sm">
                <BackGroundVideo/>
                <div style={styles.myDiv}>
                    <title style={styles.myTitle}>
                        Admin Order Status
                    </title>
                    <Map
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={styles.mapDiv}
                        center={[this.state.lon, this.state.lat]}
                        zoom={[12.75]}
                    >
                        <Marker
                            coordinates={[this.state.lon, this.state.lat]}
                            anchor="center">
                            <img src={firepit} style={{width: '30px', height: '30px'}}/>
                        </Marker>
                    </Map>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Bundles: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>$20 </title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Qty: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>x{this.state.quantity}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Total: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>${this.state.total}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Placed: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{this.state.formattedTime}</title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Order Status: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>{this.state.status}</title>
                    </div>
                    <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert onClose={handleClose} severity="error">
                            An Error occurred setting the status
                        </Alert>
                    </Snackbar>
                </div>
            </Container>
        );
    }
}
export default StatusPage;

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
        webkitBackdropFilter: 'blur(15px)',
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