import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import axios from "axios";


const PaymentRequestButton = (props) => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null)
    const { user } = props;
    const { switchScreen } = props;

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Bundles of Wood',
                    amount: user.total(),
                },
                requestPayerName: true,
                requestPayerEmail: true,
                requestPayerPhone: true,
            });

            // Check the availability of the Payment Request API.
            pr.canMakePayment().then(result => {
                if (result) {
                    console.log('found stripe payment result')
                    console.log(result)
                    const data = {
                        total: user.total,
                        quantity: user.quantity,
                        lon: user.lon,
                        lat: user.lat,
                        pitNum: user.pitNum,
                        name: result.name,
                        phone: result.phone,
                        email: result.email
                    }
                    axios
                        .post("https://loggie.app/api/order/", data)
                        .then(res => {
                                if (res) {
                                    setPaymentRequest(pr);
                                    switchScreen(props, '/confirmation')
                                }
                            })
                        .catch(err => console.log(err));
                }
            });
        }
    }, [stripe]);

    if (paymentRequest) {
        return(<PaymentRequestButtonElement options={{paymentRequest}} />)
    }

    // Use a traditional checkout form.
    //return <button>No Digital Wallets</button>;
    return null;
}

export default PaymentRequestButton;

let styles = {
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