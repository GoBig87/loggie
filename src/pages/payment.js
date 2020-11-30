import React, { Component, useState } from "react";
import firewood from "../assets/images/firewood.png"
import { IconButton, Button, Card } from "@material-ui/core";
import {Remove, Add, Apple, ShoppingCart, ArrowBack} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Fireplace from "../assets/videos/Fireplace.mp4";
import './menu.css'
import google from "../assets/images/google.svg";
import { FieldSet, InputField } from 'fannypack';
import { usePaymentInputs } from 'react-payment-inputs';


function PaymentInputs() {
    const {
        meta,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();
    const { erroredInputs, touchedInputs } = meta;

    return (
        <FieldSet isVertical>
            <InputField
                // Here is where React Payment Inputs injects itself into the input element.
                {...getCardNumberProps()}
                placeholder="0000 0000 0000 0000"
                label="Card number"
                inputRef={getCardNumberProps().ref}
                // You can retrieve error state by making use of the error & touched attributes in `meta`.
                state={erroredInputs.cardNumber && touchedInputs.cardNumber ? 'danger' : undefined}
                validationText={touchedInputs.cardNumber && erroredInputs.cardNumber}
                maxWidth="16rem"
                margin='auto'
                marginBottom="1rem"
                color="white"
            />
            <FieldSet isHorizontal marginBottom="1rem">
            <InputField
                {...getExpiryDateProps()}
                label="Expiry date"
                inputRef={getExpiryDateProps().ref}
                state={erroredInputs.expiryDate && touchedInputs.expiryDate ? 'danger' : undefined}
                validationText={touchedInputs.expiryDate && erroredInputs.expiryDate}
                maxWidth="8rem"
                margin='auto'
                color="white"

            />
            <InputField
                {...getCVCProps()}
                placeholder="123"
                label="CVC"
                inputRef={getCVCProps().ref}
                state={erroredInputs.cvc && touchedInputs.cvc ? 'danger' : undefined}
                validationText={touchedInputs.cvc && erroredInputs.cvc}
                maxWidth="5rem"
                margin='auto'
                color="white"
            />
            </FieldSet>
        </FieldSet>
    );
}

class PaymentPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            render: true
        }
    };

    processApplePay = () => {

    };

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        return(
            <Container className="main" component="main" maxWidth="xs">
                <div className="player">
                    <video autoPlay muted loop className="video">
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                    <IconButton aria-label="back"
                                style={styles.myBack}
                                onClick={() => switchScreen(this.props, '/delivery')}>
                        <ArrowBack/>
                    </IconButton>
                    <div className="wrap">
                        <title className="firewood" style={styles.myTitle}> Payment</title>
                        <></>
                        <PaymentInputs/>
                        <Button style={styles.myButton} onClick={() => switchScreen(this.props, '/confirmation')}>
                            Proceed to Confirmation
                        </Button>
                        <div style={{display:'flex', flexDirection: 'row', verticalAlign: 'middle'}}>
                            <hr style={styles.coloredLine} />
                            <body style={styles.myTitle}>
                            OR
                            </body>
                            <hr style={styles.coloredLine} />
                        </div>
                        <IconButton style={styles.appleBtn} onClick={() => this.processApplePay()}>
                            <Apple style={styles.icon}/>
                            Apple Pay
                        </IconButton>
                        <IconButton className="button" style={styles.googleBtn}>
                            <img src={google} style={styles.icon} />
                            <span className="buttonText">Google Pay</span>
                        </IconButton>
                    </div>
                </div>
            </Container>
        );
    }

}

export default PaymentPage;

let styles = {
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myCart: {
        position: 'fixed',
        color: 'white',
        right: 0,
        top: 0,
    },
    myBack: {
        position: 'fixed',
        color: 'white',
        left: 0,
        top: 0,
    },
    myRow: {
        flexDirection:'row',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        fontSize: 40,
        marginLeft:-50,
        marginRight:20,
        height:50,
        marginTop:-15,
        marginBottom:-15
    },
    myIcon: {
        flexDirection:'row',
        position: 'relative',
        color: 'white',
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
        marginTop:10,
        marginBottom:10
    },
    appleBtn:{
        color: 'black',
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        width:"80%",
        marginTop:10,
        marginBottom: 10,
        marginRight: 30,
        marginLeft: 30,
    },
    googleBtn: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        backgroundColor:"#4285F4",
        borderRadius:25,
        height:50,
        width:"80%",
        marginTop:10,
        marginBottom:10,
        marginRight: 30,
        marginLeft: 30,
    },
    myItem: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:15,
        marginTop:5,
        marginBottom:5
    },
    frostedBox: {
        display: 'inline-block',
        position: 'relative',
        marginTop: 50,
        marginBottom: 50,
        width: "100%",
        height: "100%",
        alignItemstems: 'center',
        justifyContent: 'center',
        opacity: 0.66,
        backgroundColor: '#708090',
        filter: 'blur(6px)',
        overflow: 'hidden',
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
    myButton: {
        width:"80%",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50,
        marginBottom:50
    },
    pos: {
        marginBottom: 12,
    },
}
