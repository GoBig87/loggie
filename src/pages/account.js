import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import OrderCard from "../components/orderCard";
import {Button, IconButton} from "@material-ui/core";
import {ArrowBack, ExitToApp} from "@material-ui/icons";
import axios from "axios";


class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.state.user
        this.state = {
            checkedOrders: false,
            orders: this.user.orders,
            orderCards: [],
        }
    };

    logout = () => {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        this.user.logout();
        switchScreen(this.props, '/home');
    };

    getOrdersRsp = (rsp) => {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        let orderCards = rsp.reverse().map((item, index) => {
            return <li>
                <OrderCard order={item}
                           user={user}
                           switchScreen={switchScreen}
                           {...this.props}
                />
            </li>

        });
        this.setState({orderCards: orderCards, orders: rsp, checkedOrders: true});
    };

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;

        if(!(this.state.checkedOrders)) {
            const config = this.user.config();
            axios
                .get("https://loggie.app/api/order/", config)
                .then(res => this.getOrdersRsp(res.data))
                .catch(err => console.log(err));
        }
        return(

        <Container component="main" maxWidth="sm">
            <BackGroundVideo/>
            <title style={styles.myTitle}>
                Order History {"\n"} {user.email}
            </title>
            <div style={styles.myDiv}>
                <ul>
                    {this.state.orderCards}
                </ul>
            </div>
            <div style={styles.myDivRow}>
                <Button color="secondary" style={styles.myLogoutButton} onClick={() => this.logout()}>
                    Sign out
                </Button>
                <IconButton aria-label="back"
                            style={styles.myLogoutIcon}
                            onClick={() => this.logout()}>
                    <ExitToApp/>
                </IconButton>
            </div>
        </Container>
    );
    }
}
export default AccountPage;

// styles section
let styles = {
    myDivRow: {
        position: 'fixed',
        flexDirection: 'row',
        right: 10,
        top: 10,
    },
    myDiv: {
        margin: 'auto',
        position: 'relative',
        height: '100vh',
        width: '100%',
    },
    myLogoutIcon: {
        position: 'relative',
        color: 'white',
    },
    myLogoutButton:{
        alignItems:"center",
        justifyContent:"center",
        color: "#FFFFFF",
    },
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myTitle: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItemstems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:50,
        marginBottom:10
    },
}