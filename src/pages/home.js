import React, { Component } from "react";
import Fireplace from "../assets/videos/Fireplace.mp4"
import logo from "../assets/images/logo.png"
import {Button, IconButton} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Person} from "@material-ui/icons";



class HomePage extends Component  {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;
        if (user.loggedIn === false){
            return(
                <Container component="main" maxWidth="xs">
                <div className="App" >
                    <video autoPlay muted loop muted style={styles.myVideo}>
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                    <img src={logo} style={styles.myImage} />
                    <title style={styles.myTitle}>
                        On-demand fire wood delivery
                    </title>
                    <body style={styles.myBody}>
                        Purchase firewood online and submit your location
                        to have firewood delivered right to your fire pit!
                    </body>
                    <Button style={styles.loginBtn} onClick={() => switchScreen(this.props, '/signin')}>
                        Sign in
                    </Button>
                    <Button style={styles.loginBtn} onClick={() => switchScreen(this.props, '/signup')}>
                        Create Account
                    </Button>
                    <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/about')}>
                        Learn More
                    </Button>
                </div>
                </Container>
                );
        }else{
            return(
                <Container component="main" maxWidth="xs">
                    <div className="App" >
                        <video autoPlay muted loop muted style={styles.myVideo}>
                            <source src={Fireplace} type="video/mp4"/>
                        </video>
<<<<<<< HEAD
                        <IconButton aria-label="back" style={styles.myAccount} onClick={() => switchScreen(this.props, '/account')}>
=======
                        <IconButton aria-label="back" style={styles.myIconbutton} onClick={() => switchScreen(this.props, '/account')}>
>>>>>>> abc02a199443188099a9c700e9b93ff1addf693f
                            <Person/>
                        </IconButton>
                        <img src={logo} style={styles.myImage} />
                        <title style={styles.myTitle}>
                            On-demand fire wood delivery
                        </title>
                        <body style={styles.myBody}>
                        Purchase firewood online and submit your location
                        to have firewood delivered right to your fire pit!
                        </body>
                        <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/about')}>
                            Learn More
                        </Button>
                        <Button style={styles.loginBtn} onClick={() => switchScreen(this.props, '/menu')}>
                            Purchase Wood
                        </Button>
                    </div>
                </Container>
            );
        }
    }
}

export default HomePage;

let styles = {
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myAccount: {
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
    learnBtn:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:0,
        marginBottom:50,
        textDecorationLine: 'underline'
    },
    loginBtn: {
        width:"80%",
        backgroundColor:"#FFFFFF",
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