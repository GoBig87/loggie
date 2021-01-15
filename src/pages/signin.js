import React, { Component, useState } from "react";
import BackGroundVideo from '../components/backGroundVideo'
import logo from "../assets/images/logo.png"
import {IconButton, InputBase, TextField, InputAdornment, Button} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Email, Visibility, ArrowBack, Person, VisibilityOff} from '@material-ui/icons';
import GoogleLoginButton from "../components/googleLoginButton";
import AppleLoginButton from "../components/appleLoginButton";
import FacebookLoginButton from "../components/facebookLoginButton";
import axios from "axios";
import sjcl from 'sjcl';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';


const client_side_salt = 'my_client_side_salt_string_to_increase_complexity_this_is_hashed_again_server_side'

const mdStyles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
});


class SigninPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
            open: false,
            allowClose: false,
            dialogMessage: 'Logging In...'
        };
        this.user = this.props.state.user;
    };
    setParentState = (key) => {
        this.setState(key)
    }
    // Email account creation
    signIn = (email, password) => {
        this.setState({open: true})
        this.user.email = email
        let myBitArray = sjcl.hash.sha256.hash(password.concat(client_side_salt));
        let hashedPassword = sjcl.codec.hex.fromBits(myBitArray);
        let data = {
            'email': email,
            'username': email,
            'password': hashedPassword
        }
        axios
            .post("https://loggie.app/api/rest-auth/login", data)
            .then(res => this.signInRsp(res.data))
            .catch(err => this.signinRspErr(err));
    };
    signinRspErr = (err) => {
        console.log(err)
        this.setState({
            dialogMessage: 'Failed to Log in',
            allowClose: true
            }
        )
    }
    // Handles rsp for email account creation
    signInRsp = (response) => {
        this.user.token = response.key;
        localStorage.setItem('token', this.user.token);
        localStorage.setItem('email', this.user.email);
        this.user.loggedIn = true;
        this.getOrders();
    };
    getOrders = () => {
        const config = this.user.config();
        axios
            .get("https://loggie.app/api/order/", config)
            .then(res => this.getOrdersRsp(res.data))
            .catch(err => this.getOrdersRspErr(err));
    };
    getOrdersRsp = (response) => {
        this.setState({
                dialogMessage: 'Successfully Signed in',
                allowClose: true,
                open: false,
            }
        )
        this.user.orders = response;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home');
    };
    getOrdersRspErr = (err) => {
        console.log(err)
        this.setState({
                dialogMessage: 'Failed to get Order History',
                allowClose: true
            }
        )
    }
    render() {
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

        const handleClose = () => {
            if(this.state.allowClose){
                this.setState({open: false})
            }
        };

        return(
            <Container component="main" maxWidth="xs">
                <div className="App" >
                    <BackGroundVideo/>
                    <title style={styles.myTitle}>
                        Sign in
                    </title>
                    <InputBase
                        style={styles.textField}
                        value={this.state.email}
                        onChange={handleChange('email')}
                        inputProps={{
                            style: { textAlign: 'left', padding: 20 },
                        }}
                        InputProps={{ 'aria-label': 'Email Address' }}
                        placeholder="Email Address"
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
                        inputProps={{
                            style: { textAlign: 'left', padding: 20 },
                        }}
                        InputProps={{ 'aria-label': 'Password'}}
                        placeholder="Password"
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
                        <Person style={styles.icon}/>
                        Sign In With Email
                    </IconButton>
                    <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle', marginBottom: 10}}>
                        <Button color="secondary" style={styles.learnBtn} onClick={() => switchScreen(this.props, '/signup')}>
                            Create Account
                        </Button>
                        <Button color="secondary"
                                style={styles.learnBtn}
                                onClick={switchScreen(this.props, '/reset')}>
                            Forgot Password
                        </Button>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle'}}>
                        <hr style={styles.coloredLine} />
                        <body style={styles.myOrTitle}>
                        OR
                        </body>
                        <hr style={styles.coloredLine} />
                    </div>
                    <GoogleLoginButton setParentState={this.setParentState} state={this.state} {...this.props}/>
                    <AppleLoginButton setParentState={this.setParentState} state={this.state} {...this.props}/>
                    <FacebookLoginButton setParentState={this.setParentState} state={this.state} {...this.props}/>
                    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <DialogTitle>{this.state.dialogMessage}</DialogTitle>
                        <div style={{position: 'relative', margin: 'auto', marginBottom: 10}}>
                            <CircularProgress />
                        </div>
                    </Dialog>
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
        height: 40,
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
    learnBtn:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:0,
        marginBottom:20,
        color: "#FFFFFF",
        textDecorationLine: 'underline'
    },
    coloredLine: {
        position: 'relative',
        width: "40%",
        color: 'white',
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 20,
        height: 1
    },
    loginBtn: {
        width: "100%",
        backgroundColor: "#fff59d",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 7,
        marginBottom: 7
    },
    icon: {
        fontSize: 30,
        marginLeft:-50,
        marginRight:20,
        height:30,
        marginTop:-15,
        marginBottom:-15
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
        marginTop: 40,
        marginBottom: 40
    },
    myOrTitle: {
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
        marginTop: -5,
        marginBottom: 20
    }
}