import React, { Component } from "react";
import { IconButton } from '@material-ui/core';
import {Facebook } from '@material-ui/icons';
import FacebookAuth from 'react-facebook-auth';
import axios from "axios";


class FacebookLoginButton extends Component{
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

    // Facebook sign in code
    facebookButton = ({ onClick }) => (
        <IconButton style={styles.facebookBtn} onClick={onClick}>
            <Facebook style={styles.icon}/>
            Login with Facebook
        </IconButton>
    );

    facebookAuthenticate = (response) => {
        console.log(response);
        this.user.email = response.email;
        let token = response.accessToken;
        let data = {'grant_type': 'convert_token',
            'client_id': "aDldrHAK5S0frvkGZsuPkjGlLh0nDZ4FnOZ24YMQ",
            'client_secret': "A2KSC6KdGtpSjECztY3CYTJjKrEyNGqp6ogsHImSXj5DT3EfQ7GPLA0Iu1B1NSbvaLl2bXsBhkBhha66obGRQSS1cF11QFA6EUE3BK72zQIBeF5ESHnV2oSq4VZ8md53",
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

    // Handles rsp for all return tokens
    authRsp = (response) => {
        console.log(response)
        this.user.token = response.access_token;
        this.createCustomer();
    };
    createCustomer = () => {
        const data = {'foo':'bar'};
        const config = this.user.config();
        axios
            .post("https://loggie.app/api/customer/", data, config)
            .then(res => this.createCustomerRsp(res.data))
            .catch(err => console.log(err));
    };
    createCustomerRsp = (response) => {
        console.log(response);
        this.user.updateOrders(response);
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home');
    };
    // Start Webpage layout
    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        return(
                <FacebookAuth
                    appId="383090469469321"
                    callback={this.facebookAuthenticate}
                    component={this.facebookButton}
                />
        );
    }
}

export default FacebookLoginButton;

let styles = {
    icon: {
        fontSize: 30,
        marginLeft:-50,
        marginRight:20,
        height:30,
        marginTop:-15,
        marginBottom:-15
    },
    facebookBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor:"#3b5998",
        borderRadius:25,
        height:40,
        width:"100%",
        marginTop:7,
        marginBottom:7
    },
}