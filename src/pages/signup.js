import React, { Component } from "react";
import Fireplace from "../assets/videos/Fireplace.mp4"
import logo from "../assets/images/logo.png"
import { IconButton, InputBase, InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import {Facebook, Apple, Email, Visibility, VerifiedUser, ArrowBack, VisibilityOff} from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookAuth from 'react-facebook-auth';
import axios from "axios";
import AppleLogin from 'react-apple-login';
import passwordHash from 'password-hash';
let clientID = "613632797540-u18o915kcsju9oj57u7c3m0o6ru0t78q.apps.googleusercontent.com";



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

    // Email account creation
    createAccount = (email, password) => {
        this.user.email = email;
        let hashedPassword = passwordHash.generate(password);
        console.log('Password');
        console.log(password);
        console.log('hashed');
        console.log(hashedPassword);
        let data = {
                      'email': email,
                      'username': email,
                      'password1': hashedPassword,
                      'password2': hashedPassword
                      }
        axios
            .post("https://loggie.app/api/rest-auth/registration/", data)
            .then(res => this.accountRsp(res.data))
            .catch(err => console.log(err));
    };
    // Handles rsp for email account creation
    accountRsp = (response) => {
        console.log(response)
        this.user.token = response.key;
        this.user.loggedIn = true;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home')
    };
    // Google sign in
    googleSuccess = (response) => {
        this.user.email = response.email
        let access_token = response.accessToken
        console.log(access_token)
        let data = {'client_id': "5EafzuKMzApABl0oxks8Bv3Ap671C1QvyTt2B3Sa",
                    'client_secret': "X5wRsNBUqJfoRvX92m6Y8wupnWQAEljbbrHyIbhi6vp6CivpDBCIIyg6CcVJDmHiiFnPwDvgWwFYzZRRJPw05kSBrBeZoXPfzPg6DA8913whHW0KBtkIyKln1PxaiHlA",
                    'backend': 'google-oauth2',
                    'token': access_token,
                    'grant_type': 'convert_token',
                    }
        console.log(data)
        axios
            .post("https://loggie.app/api/auth/convert-token/", data)
            .then(res => this.authRsp(res.data))
            .catch(err => console.log(err));
    }
    googleFailure = (response) => {
        console.log('Failure')
        console.log(response)
    }
    // Facebook sign in code
    facebookButton = ({ onClick }) => (
        <IconButton style={styles.facebookBtn} onClick={onClick}>
            <Facebook style={styles.icon}/>
            Login with Facebook
        </IconButton>
    );
    facebookAuthenticate = (response) => {
        console.log(response);
        let token = response.accessToken;
        let data = {'grant_type': 'convert_token',
            'client_id': "9ObRxu2jDt1SvpgCRRTZ6qRaO6rxKw3eY9KrSqYE",
            'client_secret': "CieG4uE8LPcUTUfNkfKdP7bP6KpNYOi8wUI9Vbdl5c8rGAj1HflZ0Ow9BGLFZDMNcIoZBswEMGAQTgSasxygG2ZKM4wACfVgoiz6R5RAHpDbBXzwlKuL81aUmzoSOdXZ",
            'backend': 'facebook',
            'token': token
        }
        console.log(data)
        axios
            .post("https://loggie.app/api/auth/convert-token/", data)
            .then(res => this.authRsp(res.data))
            .catch(err => console.log(err));
        // Api call to server so we can validate the token
    };
    //  Apple Sign in
    appleButton = ({ onClick }) => (
        <IconButton style={styles.appleBtn} onClick={onClick}>
            <Apple style={styles.icon}/>
            Sign in with Apple
        </IconButton>
    );
    appleAuthentication = (response) => {
        console.log(response);
        let token = response.authorization.id_token;
        let data = {'grant_type': 'convert_token',
            'client_id': "2brEF0rnw4o4WoVdbSrh48IFuTkEhgglxv2ebenP",
            'client_secret': "k0ycjsicoEtOCI5CUQpD9jT2M1JVwZxoya2gFW4y5djZYLeGPHNMbw6JaijPLFRDK1Rv6d1zYWyWlVUXGQrRbNylcRZT8vhjkgGKRR7zlCBfTW7eZXenzKI77j4Wxkzg",
            'backend': 'apple-id',
            'token': token
        }
        console.log('Loggie server rsp')
        console.log(data)
        axios
            .post("https://loggie.app/api/auth/convert-token/", data)
            .then(res => this.authRsp(res.data))
            .catch(err => console.log(err));
    };
    // Handles rsp for all return tokens
    authRsp = (response) => {
        console.log(response)
        this.user.token = response.access_token;
        this.user.loggedIn = true;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home')
    };
    // Start Webpage layout
    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        // Handles Text input UI
        const handleChange = (prop) => (event) => {
            this.setState({
                [prop]: event.target.value,
            })
        }
        // Toggles Password Text input to show/hide pw
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
                        clientId={clientID}
                        buttonText="Sign In With Google"
                        onSuccess={this.googleSuccess}
                        onFailure={this.googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div>
                    <AppleLogin clientId="com.loggie.loggie.app"
                                redirectURI="https://loggie.app"
                                responseMode= {"form_post"}
                                responseType= {"id_token"}
                                usePopup={true}
                                callback={this.appleAuthentication}
                                render={this.appleButton}
                    />
                    <FacebookAuth
                        appId="383090469469321"
                        callback={this.facebookAuthenticate}
                        component={this.facebookButton}
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