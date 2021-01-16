import React, { Component } from "react";
import logo from "../assets/images/logo.png"
import accountAlert  from "../assets/images/accountAlert.svg"
import account  from "../assets/images/account.svg"
import {Button, IconButton} from '@material-ui/core';
import { ContactPhone } from "@material-ui/icons";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'
import axios from "axios";


class HomePage extends Component  {
    constructor(props) {
        super(props);
    }

    handleRsp = (response) => {
        const { user } = this.props.state;
        user.loggedIn = true;
        this.setState({loggedIn: true})
        this.orders = response;
    };
    handleErr = (err) => {
        console.log(err)
    };

    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        if(!(user.loggedIn) && user.token) {
            const config = user.config();
            axios.get("https://loggie.app/api/order/", config)
                .then(res => this.handleRsp(res.data))
                .catch(err => this.handleErr(err))
        }

        const accountIcon = () => {
            if(user.loggedIn) {
                return (
                    <IconButton aria-label="back" style={styles.myAccount} onClick={() => switchScreen(this.props, '/account')}>
                        <img src={account} height={30} width={30}/>
                    </IconButton>)
            }
        }
        const updateButton = () => {
            if(user.loggedIn) {
                return(
                    <Button style={styles.loginBtn} onClick={() => switchScreen(this.props, '/menu')}>
                        Purchase Wood
                    </Button>
                )
            }else {
                return(
                    <Button style={styles.loginBtn} onClick={() => switchScreen(this.props, '/signin')}>
                        Sign in
                    </Button>
                )
            }
        }
        return(
            <Container component="main" maxWidth="xs">
                <div className="App" >
                    <BackGroundVideo/>
                    {accountIcon()}
                    <img src={logo} style={styles.myImage} />
                    <title style={styles.myTitle}>
                        Firewood Delivery OnDemand
                    </title>
                    <body style={styles.myBody}>
                    Purchase firewood online and submit your location
                    to have firewood delivered right to your fire pit!
                    </body>
                    <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/about')}>
                        Learn More
                    </Button>
                    {updateButton()}
                    <IconButton aria-label="back" style={styles.myContact} onClick={() => switchScreen(this.props, '/contact')}>
                        <ContactPhone/>
                    </IconButton>)
                </div>
            </Container>
        );
    }
}

export default HomePage;

let styles = {
    myAccount: {
        position: 'fixed',
        color: 'white',
        right: 10,
        top: 10,
    },
    myContact: {
        position: 'fixed',
        color: 'white',
        left: 10,
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
    contactUs: {
        position: 'fixed',
        bottom: 25,
        fontWeight: 'bold',
        alignItems:"center",
        justifyContent:"center",
        color: "#000000",
        textDecorationLine: 'underline',
        marginRight: 'auto',
        marginLeft: 'auto',
        left: 0,
        right: 0,
    },
    learnBtn:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:0,
        marginBottom:50,
        color: "#fff59d",
        textDecorationLine: 'underline'
    },
    loginBtn: {
        width:"80%",
        backgroundColor:"#fff59d",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    myIconbutton: {
        position: 'fixed',
        color: 'white',
        right: 0,
        top: 0,
    },
    loginText:{
        color:"white"
    }
}

