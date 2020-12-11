import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Fireplace from "../assets/videos/Fireplace.mp4";
import InjectedCheckoutForm from "../components/creditCardForm";
import PaymentRequestButton from "../components/paymentRequestButton"

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
                    <video autoPlay muted loop className="video">
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                        <title className="firewood"
                               style={styles.myTitle}>
                            Payment
                        </title>
                    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                        <InjectedCheckoutForm user={user}/>
                         <div style={styles.myDiv}>
                             <hr style={styles.coloredLine} />
                             <body style={styles.myTitle}>
                                OR
                             </body>
                             <hr style={styles.coloredLine} />
                         </div>
                        <body style={styles.myBody}>Use Google or Apple Pay (if available)</body>
                        <PaymentRequestButton user={user}/>
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