import React, { Component } from "react";
import { IconButton } from '@material-ui/core';
import { Apple} from '@material-ui/icons';
import axios from "axios";
import AppleLogin from 'react-apple-login';


class AppleLoginButton extends Component{
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

    //  Apple Sign in
    appleButton = ({ onClick }) => (
        <IconButton style={styles.appleBtn} onClick={onClick}>
            <Apple style={styles.icon}/>
            Sign in with Apple
        </IconButton>
    );
    appleAuthentication = (response) => {
        console.log(response);
        if (response.hasOwnProperty('error')){
            return null
        } else {
            let token = response.authorization.id_token;
            let data = {
                'grant_type': 'convert_token',
                'client_id': "GBxE6NdJyebmZ3zrqBoRKctW5wo3peJkOXBstbNf",
                'client_secret': "1yDYJyflFXrwqzTqjrllrVDs6mhPosewsDJj9m5a82KDqbKxF0DCj7rqwgOFT2fL8Pf52YZFgqwK9PHaVgjMJJlBYUnyCotQ02TEUM7AJz8ZBSMYRInnPRNq2v5p5c8Y",
                'backend': 'apple-id',
                'token': token
            }
            console.log('Loggie server rsp')
            console.log(data)
            axios
                .post("https://loggie.app/api/auth/convert-token/", data)
                .then(res => this.authRsp(res.data))
                .catch(err => console.log(err));
        }
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

        return(
                <AppleLogin clientId="com.loggie.loggie.app"
                            redirectURI="https://loggie.app"
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