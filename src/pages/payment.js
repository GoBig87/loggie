import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import BackGroundVideo from '../components/backGroundVideo'
import InjectedCheckoutForm from "../components/creditCardForm";
import PaymentRequestButton from "../components/paymentRequestButton"
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
    ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51HsCWHK9gEiACSgM8PDCldng8tYxigvfIDq09d8510aaSzeEm02BsNfLttTLiNEBOiPcwDd3sJLO71RyukxbpADw00diEeksfU",
    {apiVersion: "2020-08-27"});

class PaymentPage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.state.user
        this.state = {
            render: true
        }
    };

    render() {
        const {switchScreen} = this.props.state;
        const {user} = this.props.state;
        return (
            <Container  maxWidth="s">
                <BackGroundVideo/>
                <title className="firewood"
                       style={styles.myTitle}>
                    Payment
                </title>
                <IconButton aria-label="back"
                            style={styles.myBack}
                            onClick={() => switchScreen(this.props, '/delivery')}>
                    <ArrowBack/>
                </IconButton>
                <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                    <InjectedCheckoutForm {...this.props}/>
                     <div style={styles.myDiv}>
                         <hr style={styles.coloredLine} />
                         <body style={styles.myTitle}>
                            OR
                         </body>
                         <hr style={styles.coloredLine}confirmCardPayment />
                     </div>
                    <body style={styles.myBody}>Use Google or Apple Pay (if available)</body>
                    <PaymentRequestButton {...this.props}/>
                </Elements>
            </Container>
        );
    }
}

export default PaymentPage;

let styles = {
    myDiv: {
        display:'flex',
        flexDirection: 'row',
        verticalAlign: 'middle',
        horizontalAlign: 'center',
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
    myBody: {
        flexDirection: "row",
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 15,
        marginTop:10,
        marginBottom:10
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
    coloredLine: {
        position: 'relative',
        marginTop: 25,
        width: "40%",
        color: 'white',
        backgroundColor: 'white',
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
}