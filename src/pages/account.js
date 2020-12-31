import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import OrderCard from "../components/orderCard";
import {Button, IconButton} from "@material-ui/core";
import {ArrowBack, ExitToApp} from "@material-ui/icons";


class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.state.user
        this.state = {
            activeOrder: this.activeOrders,
            completedOrders: this.completedOrders,
        }
    };

    logout = () => {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        this.user.logout();
        switchScreen(this.props, '/home');
    };

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;

        let orders = user.orders.reverse().map((item,index)=>{
            return  <li>
                <OrderCard order={item}
                           user={user}
                           switchScreen={switchScreen}
                           {...this.props}
                />
            </li>
        })
        return(

        <Container component="main" maxWidth="lg">
            <BackGroundVideo/>
            <title style={styles.myTitle}>
                Order History
            </title>
            <div style={styles.myDiv}>
                <ul>
                    {orders}
                </ul>
            </div>
            <IconButton aria-label="back"
                        style={styles.myBack}
                        onClick={() => switchScreen(this.props, '/home')}>
                <ArrowBack/>
            </IconButton>
            <div style={styles.myDivRow}>
                <Button color="secondary" style={styles.myLogoutButton} onClick={() => this.logout()}>
                    Sign out, {user.email}
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
      marginTop: 5,
      marginBottom: 5,
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
    myCart: {
        position: 'fixed',
        color: 'white',
        right: 10,
        top: 10,
    },
    myImage:{
        position: 'relative',
        width: "50%",
        height: "50%",
        marginTop:75,
        marginBottom:50
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
    myParagraph: {
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
    myBack: {
        position: 'fixed',
        color: 'white',
        left: 0,
        top: 5,
    },
}