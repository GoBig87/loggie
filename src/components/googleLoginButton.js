import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import google from "../assets/images/google.svg";
import { IconButton } from '@material-ui/core';
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
        const { setParentState } = this.props
        setParentState({ open: true})
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
            .catch(err => this.googleFailure(err));
    }
    googleFailure = (response) => {
        console.log(response)
        const { setParentState } = this.props
        setParentState({
            dialogMessage: 'Failed to sign in',
            allowClose: true
        })
    }
    // Handles rsp for all return tokens
    authRsp = (response) => {
        console.log(response);
        this.user.token = response.access_token;
        this.user.tokenType = "Bearer"
        localStorage.setItem('tokenType', "Bearer");
        localStorage.setItem('token', this.user.token);
        localStorage.setItem('email', this.user.email);
        this.user.loggedIn = true;
        this.createCustomer();
    };
    createCustomer = () => {
        const data = {'foo':'bar'};
        const config = this.user.config();
        axios
            .post("https://loggie.app/api/customer/", data, config)
            .then(res => this.createCustomerRsp(res.data))
            .catch(err => this.googleFailure(err));
    };
    createCustomerRsp = (response) => {
        console.log(response);
        this.getOrders();
    };
    getOrders = () => {
        const config = this.user.config();
        axios
            .get("https://loggie.app/api/order/", config)
            .then(res => this.getOrdersRsp(res.data))
            .catch(err => this.googleFailure(err));
    };
    getOrdersRsp = (response) => {
        this.user.orders = response;
        console.log(this.user.orders)
        const { setParentState } = this.props
        setParentState({
                dialogMessage: 'Successfully Signed in',
                allowClose: true,
                open: false,
            }
        )
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
                    render={renderProps => (
                        <IconButton className="button"
                                    style={styles.googleBtn}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}>
                            <img src={google} style={styles.icon} />
                            <span className="buttonText">Sign in with Google</span>
                        </IconButton>                    )}
                />
        );
    }
}

export default GoogleLoginButton;


let styles = {
    googleBtn: {
        text: "Login with Facebook",
        color: 'white',
        backgroundColor:"#4285F4",
        borderRadius:25,
        height:40,
        width:"100%",
        marginTop:7,
        marginBottom:7
    },
    icon: {
        fontSize: 35,
        height:35,
        margin: 'auto',
        marginLeft:-50,
        marginRight:20,
        marginTop:-15,
        marginBottom:-15
    },
}