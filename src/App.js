import React, {Component} from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import MenuPage from "./pages/menu";
import PaymentPage from "./pages/payment";
import ConfirmationPage from "./pages/confirmation";
import DeliveryPage from "./pages/delivery"
import AboutPage from "./pages/about";
import AccountPage from "./pages/account";
import User from "./util/user";
import OrderPage from "./pages/order";
import ResetPage from "./pages/reset";
import ContactPage from "./pages/contact";
import StatusPage from "./pages/status";
import PasswordResetPage from "./pages/password-reset";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            switchScreen: this.switchScreen
        }
    }
    switchScreen = (props, params) => {
        console.log('switching screen')
        console.log(params)
        props.history.push(params);
    };
    render() {
        return(
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Route exact path="/" render={(props) => <HomePage state={this.state} {...props}/> }/>
                <Route exact path="/home" render={(props) => <HomePage state={this.state} {...props}/> }/>
                <Route exact path="/contact" render={(props) => <ContactPage state={this.state} {...props}/> }/>
                <Route exact path="/menu" render={(props) => <MenuPage state={this.state} {...props}/> }/>
                <Route exact path="/signup" render={(props) => <SignupPage state={this.state} {...props}/> }/>
                <Route exact path="/signin" render={(props) => <SigninPage state={this.state} {...props}/> }/>
                <Route exact path="/delivery" render={(props) => <DeliveryPage state={this.state} {...props}/> }/>
                <Route exact path="/payment" render={(props) => <PaymentPage state={this.state} {...props}/> }/>
                <Route exact path="/confirmation" render={(props) => <ConfirmationPage state={this.state} {...props}/> }/>
                <Route exact path="/about" render={(props) => <AboutPage state={this.state} {...props}/> }/>
                <Route exact path="/account" render={(props) => <AccountPage state={this.state} {...props}/> }/>
                <Route exact path="/order" render={(props) => <OrderPage state={this.state} {...props}/> }/>
                <Route exact path="/reset" render={(props) => <ResetPage state={this.state} {...props}/> }/>
                <Route exact path="/status/:id/:status" render={(props) => <StatusPage state={this.state} {...props}/> }/>
                <Route exact path="/password-reset/:uid/:token" render={(props) => <PasswordResetPage state={this.state} {...props}/> }/>
            </div>
        </Router>
        );
    }
}

export default App;