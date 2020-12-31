import React, { Component } from "react";
import logo from "../assets/images/logo.png"
import accountAlert  from "../assets/images/accountAlert.svg"
import account  from "../assets/images/account.svg"
import {Button, IconButton} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'


class HomePage extends Component  {
    constructor(props) {
        super(props);
        const { user } = this.props.state;
        this.state = {
            loggedIn: user.loggedIn,
        }
    }
    handleChange = (e) => {
        this.setState({ loggedIn: e.target.value });
    };
    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        const accountIcon = () => {
            if(this.state.loggedIn) {
                return (
                    <IconButton aria-label="back" style={styles.myAccount} onClick={() => switchScreen(this.props, '/account')}>
                        <img src={account} height={30} width={30}/>
                    </IconButton>)
            }
        }
        const updateButton = () => {
            if(this.state.loggedIn) {
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
                        On-demand fire wood delivery
                    </title>
                    <body style={styles.myBody}>
                    Purchase firewood online and submit your location
                    to have firewood delivered right to your fire pit!
                    </body>
                    <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/about')}>
                        Learn More
                    </Button>
                    {updateButton()}
                </div>
                <input
                    type="text"
                    value={this.state.loggedIn}
                    onChange={this.handleChange}
                />
            </Container>
        );
    }
}

export default HomePage;

let styles = {
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

