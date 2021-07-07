import React from 'react';
import {CardElement, ElementsConsumer, useElements} from '@stripe/react-stripe-js';
import './creditCardForm.css';
import axios from "axios";


const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: '#87BBFD',
            },
        },
        invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
        },
    },
};

const CardField = ({onChange}) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

const Field = ({
                   label,
                   id,
                   type,
                   placeholder,
                   required,
                   autoComplete,
                   value,
                   onChange,
               }) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        <input
            className="FormRowInput"
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SubmitButton = ({processing, error, children, disabled}) => (
    <button
        className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? 'Processing...' : children}
    </button>
);

const ErrorMessage = ({children}) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({onClick}) => (
    <button type="button" className="ResetButton" onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#FFF"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);

const DEFAULT_STATE = {
    error: null,
    cardComplete: false,
    processing: false,
    paymentMethod: null,
    email: '',
    phone: '',
    name: '',
    user: '',
};

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { setParentState } = this.props;
        setParentState({ open: true});
        const {stripe, elements} = this.props;
        const {email, phone, name, error, cardComplete} = this.state;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (error) {
            elements.getElement('card').focus();
            this.paymentErr(error)
            return;
        }

        if (cardComplete) {
            this.setState({processing: true});
            let { user } =  this.props.state;
            const data = {
                quantity: user.quantity
            }
            const config = user.config();
            axios
                .post("https://loggie.app/api/charge/", data, config)
                .then(res => this.paymentIntentRsp(res.data))
                .catch(err => this.paymentErr(err));
        }

        this.setState({processing: false});

    };
    paymentIntentRsp = (response) => {
        const clientSecret = response.client_secret;
        const {stripe, elements} = this.props;
        console.log(response)
        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: this.state.name,
                        email: this.state.email
                    },
                },
            })
            .then(result => this.confirmCardPayment(result))
            .catch(err => this.paymentErr(err));
    }
    confirmCardPayment = (result) => {
        let { user } =  this.props.state;
        if(result.paymentIntent) {
            const data = {
                paymentIntent: result.paymentIntent.id,
            }
            let config = user.config();
            axios
                .put("https://loggie.app/api/charge/", data, config)
                .then(res => this.confirmCardPaymentRsp(res.data))
                .catch(err => this.paymentErr(err));
        }
        if(result.error){
            this.paymentErr(result.error)
        }
    }
    confirmCardPaymentRsp = (response) => {
        console.log(response)
        // Payment succeeded, now create the order
        let { user } =  this.props.state;
        const data = {
            total: user.total(),
            quantity: user.quantity,
            lon: user.lon,
            lat: user.lat,
            pitNum: user.pitNum,
            phone: this.state.phone,
            email: this.state.email,
            name: this.state.name
        }
        let config = user.config();
        axios
            .post("https://loggie.app/api/order/", data, config)
            .then(res => this.confirmOrderRsp(res.data))
            .catch(err => this.paymentErr(err));
    }
    confirmOrderRsp = (response) => {
        console.log(response);
        this.updateOrders();
    }
    updateOrders = () => {
        let {user} = this.props.state;
        let config = user.config();
        axios
            .get("https://loggie.app/api/order/", config)
            .then(res => this.updateOrdersRsp(res.data))
            .catch(err => this.paymentErr(err));
    };
    updateOrdersRsp = (response) => {
        const { setParentState } = this.props;
        let { switchScreen } = this.props.state;
        let { user } =  this.props.state;
        setParentState({
                dialogMessage: 'Payment Succeeded',
                allowClose: true,
                open: false,
            }
        );
        user.orders = response;
        switchScreen(this.props, '/confirmation');
    };
    paymentErr = (err) => {
        console.log(err);
        const { setParentState } = this.props;
        setParentState({
            dialogMessage: 'Failed to Process Payment',
            allowClose: true
        });
    };
    reset = () => {
        this.setState(DEFAULT_STATE);
    };

    render() {
        const {error, processing, paymentMethod, name, email, phone } = this.state;
        let { user } =  this.props.state;
        const {stripe} = this.props;
        return paymentMethod ? (
            <div className="Result">
                <div className="ResultTitle" role="alert">
                    Payment successful
                </div>
                <div className="ResultMessage">
                    Thanks for trying Stripe Elements. No money was charged, but we
                    generated a PaymentMethod: {paymentMethod.id}
                </div>
                <ResetButton onClick={this.reset} />
            </div>
        ) : (
            <form className="Form" onSubmit={this.handleSubmit}>
                <fieldset className="FormGroup">
                    <Field
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                            this.setState({name: event.target.value});
                        }}
                    />
                    <Field
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="janedoe@gmail.com"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                            this.setState({email: event.target.value});
                        }}
                    />
                    <Field
                        label="Phone"
                        id="phone"
                        type="tel"
                        placeholder="(941) 555-0123"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) => {
                            this.setState({phone: event.target.value});
                        }}
                    />
                </fieldset>
                <fieldset className="FormGroup">
                    <CardField
                        onChange={(event) => {
                            this.setState({
                                error: event.error,
                                cardComplete: event.complete,
                            });
                        }}
                    />
                </fieldset>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                <SubmitButton processing={processing} error={error} disabled={!stripe}>
                    Pay ${user.total()}
                </SubmitButton>
            </form>
        );
    }
}

const InjectedCheckoutForm = (props => (
    <ElementsConsumer>
        {({stripe, elements}) => (
            <CheckoutForm setParentState={props.setParentState} stripe={stripe} elements={elements} {...props} />
        )}
    </ElementsConsumer>
));


export default InjectedCheckoutForm;