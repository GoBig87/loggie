import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import OrderCard from "../components/orderCard";
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";


class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.state.user
        this.state = {
            activeOrder: this.activeOrders,
            completedOrders: this.completedOrders,
        }
    }

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;

        let orders = user.orders.map((item,index)=>{
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
        </Container>
    );
    }
}
export default AccountPage;

// styles section
let styles = {
    myDiv: {
      marginTop: 5,
      marginBottom: 5,
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