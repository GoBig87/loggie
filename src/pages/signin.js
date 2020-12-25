import React, { Component, useState } from "react";
import Fireplace from "../assets/videos/Fireplace.mp4"
import logo from "../assets/images/logo.png"
import {IconButton, InputBase, TextField, InputAdornment, Button} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Email, Visibility, ArrowBack, VerifiedUser, VisibilityOff} from '@material-ui/icons';
import GoogleLoginButton from "../components/googleLoginButton";
import AppleLoginButton from "../components/appleLoginButton";
import FacebookLoginButton from "../components/facebookLoginButton";
import axios from "axios";
import sjcl from 'sjcl'
import SignupPage from "./signup";

const client_side_salt = 'my_client_side_salt_string_to_increase_complexity_this_is_hashed_again_server_side'


class SigninPage extends Component{
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
    signIn = (email, password) => {
        this.user.email = email
        let myBitArray = sjcl.hash.sha256.hash(password.concat(client_side_salt));
        let hashedPassword = sjcl.codec.hex.fromBits(myBitArray);
        console.log('Password');
        console.log(password);
        console.log('hashed');
        console.log(hashedPassword);
        let data = {
            'email': email,
            'username': email,
            'password': hashedPassword
        }
        axios
            .post("https://loggie.app/api/rest-auth/login", data)
            .then(res => this.signInRsp(res.data))
            .catch(err => console.log(err));
    };
    // Handles rsp for email account creation
    signInRsp = (response) => {
        console.log(response)
        this.user.token = response.key;
        this.user.loggedIn = true;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home')
    };
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
                        Sign in
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
                                onClick={() => this.signIn(this.state.email, this.state.password)}>
                        <VerifiedUser style={styles.icon}/>
                        Sign In
                    </IconButton>
                    <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle'}}>
                        <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/signup')}>
                            Create Account
                        </Button>
                        <Button color="secondary" style={styles.learnBtn}>
                            Forgot Password
                        </Button>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle'}}>
                        <hr style={styles.coloredLine} />
                        <body style={styles.myTitle}>
                        OR
                        </body>
                        <hr style={styles.coloredLine} />
                    </div>
                    <div style={styles.phoneDiv}>
                        <GoogleLoginButton state={this.state} {...this.props}/>
                    </div>
                    <AppleLoginButton state={this.state} {...this.props}/>
                    <FacebookLoginButton state={this.state} {...this.props}/>
                </div>
            </Container>
        );
    }
}

export default SigninPage;

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
    myImage: {
        position: 'relative',
        width: "35%",
        height: "35%",
        top: 10,
        marginTop: 7,
        marginBottom: 7
    },
    textField: {
        marginTop: 7,
        marginBottom: 7,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        width: '100%',
    },
    field: {
        textShadowRadius: 25,
        outline: 'none',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 30,
        borderRadius: 25,
        position: 'relative',
        marginTop: 7,
        marginBottom: 7,
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
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 7,
        marginBottom: 7
    },
    icon: {
        fontSize: 25,
        marginLeft: -50,
        marginRight: 20,
        height: 25,
        marginTop: -15,
        marginBottom: -15
    },
    googleBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor: "#4285F4",
        borderRadius: 25,
        height: 40,
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    facebookBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor: "#3b5998",
        borderRadius: 25,
        height: 40,
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    appleBtn: {
        text: "Login with Facebook",
        color: 'black',
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        height: 40,
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    myTitle: {
        flexDirection: "row",
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 10
    }
}