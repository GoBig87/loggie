import React, { Component } from "react";
import BackGroundVideo from '../components/backGroundVideo'
import logo from "../assets/images/logo.png"
import { IconButton, InputBase, InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Email, Cached} from '@material-ui/icons';
import axios from "axios";
import sjcl from "sjcl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


class ResetPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            weight: '',
            weightRange: '',
            open: false,
            alertOpen: false,
            allowClose: true,
            dialogMessage: 'Sending Password Reset Email.\n Please Check your email.'
        };
        this.user = this.props.state.user;
    };

    resetPassword = (email) => {
        let data = {
            'email': email,
        }
        axios
            .post("https://loggie.app/api/rest-auth/password/reset/", data)
            .then(res => this.resetPasswordRsp(res.data))
            .catch(err => this.resetPasswordErr(err));
    };
    resetPasswordRsp = (rsp) => {
        this.setState({open: true});
    };
    resetPasswordErr = () => {
        this.setState({alertOpen: true});
    };
    // Start Webpage layout
    render() {

        // Handles Text input UI
        const handleChange = (prop) => (event) => {
            this.setState({
                [prop]: event.target.value,
            })
        };
        const openDialog = () => {
            this.setState({alertOpen: true});
        };
        const handleClose = () => {
            if(this.state.allowClose){
                this.setState({open: false})
            }
            const { switchScreen } = this.props.state;
            switchScreen(this.props, '/home')
        };

        const handleAlertClose = () => {
            this.setState({
                alertOpen: false,
            });
        };

        return(
            <Container component="main" maxWidth="xs">
                <div className="App" >
                    <BackGroundVideo/>
                    <title style={styles.myTitle}>
                        Reset Password
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

                    <IconButton style={styles.loginBtn}
                                onClick={() => this.resetPassword(this.state.email)}>
                        <Cached style={styles.icon}/>
                        Reset Password
                    </IconButton>
                    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <DialogTitle>{this.state.dialogMessage}</DialogTitle>
                        <div style={{position: 'relative', margin: 'auto', marginBottom: 10}}>
                            <CircularProgress />
                        </div>
                    </Dialog>
                    <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert onClose={handleClose} severity="error">
                            Error Reseting Email
                        </Alert>
                    </Snackbar>
                </div>
            </Container>
        );
    }
}

export default ResetPage;

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
        backgroundColor:"#fff59d",
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