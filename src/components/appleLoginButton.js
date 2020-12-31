import React, { Component } from "react";
import { IconButton } from '@material-ui/core';
import { Apple} from '@material-ui/icons';
import axios from "axios";
import AppleLogin from 'react-apple-login';


class AppleLoginButton extends Component{
    constructor(props) {
        super(props);
        this.user = this.props.state.user;
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
        const { setParentState } = this.props;
        setParentState({ open: true});
        if (response.hasOwnProperty('error')){
            this.authErr(response);
        } else {
            let token = response.authorization.id_token;
            let data = {
                'grant_type': 'convert_token',
                'client_id': "GBxE6NdJyebmZ3zrqBoRKctW5wo3peJkOXBstbNf",
                'client_secret': "1yDYJyflFXrwqzTqjrllrVDs6mhPosewsDJj9m5a82KDqbKxF0DCj7rqwgOFT2fL8Pf52YZFgqwK9PHaVgjMJJlBYUnyCotQ02TEUM7AJz8ZBSMYRInnPRNq2v5p5c8Y",
                'backend': 'apple-id',
                'token': token
            };
            console.log('Loggie server rsp');
            console.log(data);
            axios
                .post("https://loggie.app/api/auth/convert-token/", data)
                .then(res => this.authRsp(res.data))
                .catch(err => this.authErr(err));
        }
    };
    // Handles rsp for all return tokens
    authRsp = (response) => {
        console.log(response)
        this.user.token = response.access_token;
        this.user.loggedIn = true;
        this.createCustomer();
    };
    authErr = (err) => {
        console.log(err);
        const { setParentState } = this.props;
        setParentState({
            dialogMessage: 'Failed to sign in',
            allowClose: true
        });
    };
    createCustomer = () => {
        const data = {'foo':'bar'};
        const config = this.user.config();
        axios
            .post("https://loggie.app/api/customer/", data, config)
            .then(res => this.createCustomerRsp(res.data))
            .catch(err => this.authErr(err));
    };
    createCustomerRsp = (response) => {
        console.log(response);
        this.user.email = response.email;
        localStorage.setItem('token', this.user.token);
        localStorage.setItem('email', this.user.email);
        this.getOrders();
    };
    getOrders = () => {
        const config = this.user.config();
        axios
            .get("https://loggie.app/api/order/", config)
            .then(res => this.getOrdersRsp(res.data))
            .catch(err => this.authErr(err));
    };
    getOrdersRsp = (response) => {
        this.user.orders = response;
        const { switchScreen } = this.props.state;
        const { setParentState } = this.props;
        setParentState({
                dialogMessage: 'Successfully Signed in',
                allowClose: true,
                open: false,
            }
        );
        switchScreen(this.props, '/home');
    };
    // Start Webpage layout
    render() {
        const { user } = this.props.state;
        const { switchScreen } = this.props.state;

        return(
            <AppleLogin clientId={"com.loggie.loggie.app"}
                        redirectURI={"https://loggie.app"}
                        scope={"email"}
                        responseMode= {"form_post"}
                        responseType= {"id_token"}
                        usePopup={true}
                        callback={this.appleAuthentication}
                        render={this.appleButton}
            />

        );
    }
}

export default AppleLoginButton;

let styles = {
    icon: {
        fontSize: 30,
        marginLeft:-50,
        marginRight:20,
        height:30,
        marginTop:-15,
        marginBottom:-15
    },
    appleBtn:{
        text: "Login with Facebook",
        color: 'black',
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:40,
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
}