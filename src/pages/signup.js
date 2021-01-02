import React, { Component } from "react";
import BackGroundVideo from '../components/backGroundVideo'
import logo from "../assets/images/logo.png"
import { IconButton, InputBase, InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Email, Visibility, PersonAdd, ArrowBack, VisibilityOff} from '@material-ui/icons';
import axios from "axios";
import sjcl from "sjcl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const client_side_salt = 'my_client_side_salt_string_to_increase_complexity_this_is_hashed_again_server_side';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


class SignupPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password1: '',
            password2: '',
            weight: '',
            weightRange: '',
            showPassword1: false,
            showPassword2: false,
            open: false,
            alertOpen: false,
            allowClose: false,
            dialogMessage: 'Creating Account...'
        };
        this.user = this.props.state.user;
    };

    // Email account creation
    createAccount = (email, password1, password2) => {
        if(password1 != password2){
            this.setState({alertOpen: true});
        }else {
            this.setState({open: true})
            this.user.email = email;
            let myBitArray1 = sjcl.hash.sha256.hash(password1.concat(client_side_salt));
            let hashedPassword1 = sjcl.codec.hex.fromBits(myBitArray1);
            let myBitArray2 = sjcl.hash.sha256.hash(password2.concat(client_side_salt));
            let hashedPassword2 = sjcl.codec.hex.fromBits(myBitArray2);
            let data = {
                'email': email,
                'username': email,
                'password1': hashedPassword1,
                'password2': hashedPassword2
            }
            axios
                .post("https://loggie.app/api/rest-auth/registration/", data)
                .then(res => this.accountRsp(res.data))
                .catch(err => this.accountErr(err));
        }
    };
    // Handles rsp for email account creation
    accountRsp = (response) => {
        console.log(response)
        this.setState({
                dialogMessage: 'Successfully Signed in',
                allowClose: true,
                open: false,
            }
        )
        this.user.token = response.key;
        localStorage.setItem('token', this.user.token);
        localStorage.setItem('email', this.user.email);
        this.user.loggedIn = true;
        const { switchScreen } = this.props.state;
        switchScreen(this.props, '/home')
    };
    accountErr = (err) => {
        console.log(err)
        this.setState({
                dialogMessage: 'Failed to Create Account',
                allowClose: true
            }
        )
    }
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
        const handleClickShowPassword1 = () => {
            this.setState(
                {
                    showPassword1: !this.state.showPassword1
                }
            )
        };
        // Toggles Password Text input to show/hide pw
        const handleClickShowPassword2 = () => {
            this.setState(
                {
                    showPassword2: !this.state.showPassword2
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

        const handleAlertClose = () => {
            this.setState({
                alertOpen: false,
                password1: '',
                password2: '',
            });
        };

        return(
            <Container component="main" maxWidth="xs">
                <div className="App" >
                    <BackGroundVideo/>
                    <IconButton aria-label="back" style={styles.myBack} onClick={() => switchScreen(this.props, '/signin')}>
                        <ArrowBack/>
                    </IconButton>
                    <title style={styles.myTitle}>
                        Create Account
                    </title>
                    <InputBase
                        style={styles.textField}
                        value={this.state.email}
                        onChange={handleChange('email')}
                        InputProps={{ 'aria-label': 'Email Address' }}
                        placeholder="Email Address"
                        inputProps={{
                            style: { textAlign: 'left', padding: 20 },
                        }}
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
                        type={this.state.showPassword1 ? 'text' : 'password'}
                        value={this.state.password1}
                        onChange={handleChange('password1')}
                        InputProps={{ 'aria-label': 'Password' }}
                        placeholder="Password"
                        inputProps={{
                            style: { textAlign: 'left', padding: 20 },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <InputBase
                        style={styles.textField}
                        type={this.state.showPassword2 ? 'text' : 'password'}
                        value={this.state.password2}
                        onChange={handleChange('password2')}
                        InputProps={{ 'aria-label': 'Confirm Password' }}
                        placeholder="Confirm Password"
                        inputProps={{
                            style: { textAlign: 'left', padding: 20 },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <IconButton style={styles.loginBtn}
                                onClick={() => this.createAccount(this.state.email, this.state.password1, this.state.password2)}>
                        <PersonAdd style={styles.icon}/>
                        Create Account
                    </IconButton>
                    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <DialogTitle>{this.state.dialogMessage}</DialogTitle>
                        <div style={{position: 'relative', margin: 'auto', marginBottom: 10}}>
                            <CircularProgress />
                        </div>
                    </Dialog>
                    <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert onClose={handleClose} severity="error">
                            Passwords do not match!
                        </Alert>
                    </Snackbar>
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
        height: 40,
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
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    icon: {
        fontSize: 30,
        marginLeft:-50,
        marginRight:20,
        height:30,
        marginTop:-15,
        marginBottom:-15
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
        marginTop:20,
        marginBottom:60
    }
}