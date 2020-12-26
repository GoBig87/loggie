import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
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
        this.user.email = response.profileObj.email;
        let access_token = response.accessToken;
        console.log(access_token)
        let data = {'client_id': "fv4HSO9twEEqu6KA4jGrpeesxqJpUoX1ix4cK3ST",
            'client_secret': "H1tdyhoe58iISkkMdZrrb15iSkpE19MXxz4uRx9maGrtNpysPu2c7KjAbwUvFgSykw0Q4c0ET5vIau1EmjrDq4tkNmH9GFKBNgG7pfGx1HOBrw9dQKLNtjE1P1OTcNDD",
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
        console.log(response);
        this.user.token = response.access_token;
        this.user.loggedIn = true;
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
