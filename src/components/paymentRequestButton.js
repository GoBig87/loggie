import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";


const PaymentRequestButton = () => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Bundles of Wood',
                    amount: 1099,
                },
                requestPayerName: true,
                requestPayerEmail: true,
                requestPayerPhone: true,
            });

            // Check the availability of the Payment Request API.
            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
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