import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import BackGroundVideo from '../components/backGroundVideo'
import InjectedCheckoutForm from "../components/creditCardForm";
import PaymentRequestButton from "../components/paymentRequestButton"
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

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
            render: true,
            open: false,
            allowClose: false,
            dialogMessage: 'Processing Payment...'
        }
    };

    setParentState = (key) => {
        this.setState(key)
    }

    render() {
        const {switchScreen, user} = this.props.state;

        const handleClose = () => {
            if(this.state.allowClose){
                this.setState({open: false})
            }
        };

        if(user.quantity == 0){
          switchScreen(this.props, '/menu')
        };

        return (
            <Container  maxWidth="s">
                <BackGroundVideo/>
                <title className="firewood"
                       style={styles.myTitle}>
                    Payment
                </title>
                <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                    <InjectedCheckoutForm setParentState={this.setParentState} {...this.props}/>
                     <div style={styles.myDiv}>
                         <hr style={styles.coloredLine} />
                         <body style={styles.myTitle}>
                            OR
                         </body>
                         <hr style={styles.coloredLine}confirmCardPayment />
                     </div>
                    <body style={styles.myBody}>Use Google or Apple Pay (if available)</body>
                    <PaymentRequestButton setParentState={this.setParentState} {...this.props}/>
                </Elements>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle>{this.state.dialogMessage}</DialogTitle>
                    <div style={{position: 'relative', margin: 'auto', marginBottom: 10}}>
                        <CircularProgress />
                    </div>
                </Dialog>
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