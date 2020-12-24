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



class GoogleLoginButton extends Component{
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

        return(
                <GoogleLogin
                    theme='dark'
                    style={{width: '200%'}}
                    clientId={clientID}
                    buttonText="Sign In With Google"
                    onSuccess={this.googleSuccess}
                    onFailure={this.googleFailure}
                    cookiePolicy={'single_host_origin'}
                />
        );
    }
}

export default GoogleLoginButton;
