import React, { Component } from "react";
import Fireplace from "../assets/videos/Fireplace.mp4"
import logo from "../assets/images/logo.png"
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';


class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render()

    { return(

        <Container component="main" maxWidth="xs">
            <div className="App" >
                <video autoPlay muted loop muted style={styles.myVideo}>
                    <source src={Fireplace} type="video/mp4"/>
                </video>
                <img src={logo} style={styles.myImage} />
                <title style={styles.myTitle}>
                    Account Information
                </title>
                <p style={styles.myParagraph}>
                    Here's where you can find your account information
                </p>
                <body style={styles.myBody}>
                more account info.
                </body>
            </div>
        </Container>
    );
    }
}
export default AccountPage;

// styles section
let styles = {
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
    }
}