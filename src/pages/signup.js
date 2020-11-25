import React, { Component, useState } from "react";
import Fireplace from "../assets/videos/Fireplace.mp4"
import logo from "../assets/images/logo.png"
import google from "../assets/images/google.svg"
import { IconButton, InputBase, InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import {Facebook, Apple, Email, Visibility, VerifiedUser, ArrowBack, VisibilityOff} from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookAuth from 'react-facebook-auth';
import axios from "axios";


class SignupPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
        };
        this.user = this.props.state.user;
    };
    createAccount = (email, password) => {
        this.user.email = email;
        let data = {
                      'email': email,
                      'username': email,
                      'password1': password,
                      'password2': password
                      }
        axios
            .post("https://loggie.app/api/rest-auth/registration/", data)
            .then(res => this.createAccountRsp(res.data))
            .catch(err => console.log(err));
    };
    createAccountRsp = (response) => {
        this.user.token = response.key;
        this.user.loggedIn = true;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home')
    }
    // Google sign in
    responseGoogleSuccess = (response) => {
        console.log('Success')
        console.log(response)
    }
    responseGoogleFailure = (response) => {
        console.log('Failure')
        console.log(response)
    }
    // Facebook sign in
    myFacebookButton = ({ onClick }) => (
        <IconButton style={styles.facebookBtn} onClick={onClick}>
            <Facebook style={styles.icon}/>
            Login with Facebook
        </IconButton>
    );
    myFacebookAuthenticate = (response) => {
        console.log(response);
        // Api call to server so we can validate the token
    };

    // Apple Sign in


    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        const handleChange = (prop) => (event) => {
            this.setState({
                [prop]: event.target.value,
            })
        }

        const handleClickShowPassword = () => {
            this.setState(
                {
                    showPassword: !this.state.showPassword
                }
            )
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return(
            <Container component="main" maxWidth="xs">
                <div className="App" >
                    <video autoPlay muted loop muted style={styles.myVideo}>
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                    <IconButton aria-label="back" style={styles.myBack} onClick={() => switchScreen(this.props, '/home')}>
                        <ArrowBack/>
                    </IconButton>
                    <img src={logo} style={styles.myImage} />
                    <title style={styles.myTitle}>
                        Create Account
                    </title>
                    <InputBase
                        style={styles.textField}
                        value={this.state.email}
                        onChange={handleChange('email')}
                        InputProps={{ 'aria-label': 'naked' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                    <Email/>
                                </IconButton>
                            </InputAdornment>
                        }/>
                    <InputBase
                        style={styles.textField}
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={handleChange('password')}
                        InputProps={{ 'aria-label': 'naked' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <IconButton style={styles.loginBtn}
                                onClick={() => this.createAccount(this.state.email, this.state.password)}>
                        <VerifiedUser style={styles.icon}/>
                        Create Account
                    </IconButton>
                <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle'}}>
                    <hr style={styles.coloredLine} />
                    <body style={styles.myTitle}>
                        OR
                    </body>
                    <hr style={styles.coloredLine} />
                </div>
                    <div style={styles.phoneDiv}>
                    <GoogleLogin
                        theme='dark'
                        style={{width: '200%'}}
                        clientId="613632797540-u18o915kcsju9oj57u7c3m0o6ru0t78q.apps.googleusercontent.com"
                        buttonText="Sign In With Google"
                        onSuccess={this.responseGoogleSuccess}
                        onFailure={this.responseGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div>
                    <IconButton style={styles.appleBtn} onClick={() => this.switchScreen('/home')}>
                        <Apple style={styles.icon}/>
                        Sign in with Apple
                    </IconButton>
                    <FacebookAuth
                        appId="<app-id>"
                        callback={this.myFacebookAuthenticate}
                        component={this.myFacebookButton}
                    />
                </div>
            </Container>
        );
    }
}

export default SignupPage;

let styles = {
    phoneDiv: {
        position: 'relative',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: "90%",
    },
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myBack: {
        position: 'fixed',
        color: 'white',
        left: 0,
        top: 0,
    },
    myImage:{
        position: 'relative',
        width: "50%",
        height: "50%",
        top: 0,
        marginTop:0,
        marginBottom:50
    },
    textField: {
        marginTop:10,
        marginBottom:10,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        width: '100%',
    },
    field: {
        textShadowRadius: 25,
        outline: 'none',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 50,
        borderRadius: 25,
        position: 'relative',
        marginTop:10,
        marginBottom:10,
        fontSize: 20
    },
    coloredLine: {
        position: 'relative',
        marginTop: 25,
        width: "40%",
        color: 'white',
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        height: 1
    },
    loginBtn: {
        width:"100%",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    icon: {
        fontSize: 40,
        marginLeft:-50,
        marginRight:20,
        height:50,
        marginTop:-15,
        marginBottom:-15
    },
    googleBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor:"#4285F4",
        borderRadius:25,
        height:50,
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
    facebookBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor:"#3b5998",
        borderRadius:25,
        height:50,
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
    appleBtn:{
        text: "Login with Facebook",
        color: 'black',
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
    myTitle: {
        flexDirection: "row",
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:10,
        marginBottom:10
    }
}