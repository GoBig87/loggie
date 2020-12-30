import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import axios from "axios";


const PaymentRequestButton = (props) => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null)

    useEffect(() => {
        if (stripe) {
            let { user } = props.state;

            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Loggie Firewood',
                    amount: user.total()*100,
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
            pr.on('paymentmethod', async (ev) => {
                // Confirm the PaymentIntent without handling potential next actions (yet).
                const { setParentState } = props;
                setParentState({ open: true});
                let { user } =  props.state;
                const data = {
                    quantity: user.quantity
                };
                const config = user.config();
                const response = await axios.post("https://loggie.app/api/charge/", data, config)
                const clientSecret = response.data.client_secret;
                const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
                    clientSecret,
                    {payment_method: ev.paymentMethod.id},
                    {handleActions: false}
                );

                if (confirmError) {
                    // Report to the browser that the payment failed, prompting it to
                    // re-show the payment interface, or show an error message and close
                    // the payment interface.
                    ev.complete('fail');
                    setParentState({
                        dialogMessage: 'Failed to Process Payment',
                        allowClose: true
                    });
                } else {
                    // Report to the browser that the confirmation was successful, prompting
                    // it to close the browser payment method collection interface.
                    ev.complete('success');
                    // Check if the PaymentIntent requires any actions and if so let Stripe.js
                    // handle the flow. If using an API version older than "2019-02-11" instead
                    // instead check for: `paymentIntent.status === "requires_source_action"`.
                    if (paymentIntent.status === "requires_action") {
                        // Let Stripe.js handle the rest of the payment flow.
                        const {error} = await stripe.confirmCardPayment(clientSecret);
                        if (error) {
                            // The payment failed -- ask your customer for a new payment method.
                            console.log('Pay Now Payment Failed');
                            setParentState({
                                dialogMessage: 'Failed to Process Payment',
                                allowClose: true
                            });
                        } else {
                            // The payment has succeeded.
                            let { user } =  props.state;
                            let { switchScreen } =  props.state;
                            const config = user.config();
                            const data = {
                                total: user.total(),
                                quantity: user.quantity,
                                lon: user.lon,
                                lat: user.lat,
                                pitNum: user.pitNum,
                                phone: paymentIntent.shipping.phone,
                                email: paymentIntent.receipt_email,
                                name: paymentIntent.shipping.name
                            };
                            const resp1 = await axios.post("https://loggie.app/api/order/", data, config);
                            if(resp1.data) {
                                const resp2 = await axios.get("https://loggie.app/api/order/");
                                if(resp2.data) {
                                    user.orders = resp2.data;
                                    setParentState({
                                            dialogMessage: 'Payment Succeeded',
                                            allowClose: true,
                                            open: false,
                                        }
                                    );
                                    switchScreen(props, '/confirmation');
                                }else{
                                    console.log(resp2)
                                    setParentState({
                                        dialogMessage: 'Failed to Process Payment',
                                        allowClose: true
                                    });
                                }
                            }else{
                                console.log(resp1)
                                setParentState({
                                    dialogMessage: 'Failed to Process Payment',
                                    allowClose: true
                                });
                            }
                        }
                    } else {
                        // The payment has succeeded.
                        let { user } =  props.state;
                        let { switchScreen } =  props.state;
                        const config = user.config();
                        const data = {
                            total: user.total(),
                            quantity: user.quantity,
                            lon: user.lon,
                            lat: user.lat,
                            pitNum: user.pitNum,
                            phone: ev.payerPhone,
                            email: user.email,
                            name: ev.payerName
                        };
                        const resp1 = await axios.post("https://loggie.app/api/order/", data, config);
                        if(resp1.data) {
                            const resp2 = await axios.get("https://loggie.app/api/order/");
                            if(resp2.data) {
                                user.orders = resp2.data;
                                setParentState({
                                        dialogMessage: 'Payment Succeeded',
                                        allowClose: true,
                                        open: false,
                                    }
                                );
                                switchScreen(props, '/confirmation');
                            }else{
                                console.log(resp2)
                                setParentState({
                                    dialogMessage: 'Failed to Process Payment',
                                    allowClose: true
                                });
                            }
                        }else{
                            console.log(resp1)
                            setParentState({
                                dialogMessage: 'Failed to Process Payment',
                                allowClose: true
                            });
                        }
                    }
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