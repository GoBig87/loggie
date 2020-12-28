import React, { Component, useState } from "react";
import firewood from "../assets/images/firewood.png"
import { IconButton, Button, Card } from "@material-ui/core";
import {Remove, Add, ShoppingCart, ArrowBack} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import BackGroundVideo from '../components/backGroundVideo'
import './menu.css'

class MenuPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            total: 0
        }
    }
    addQuantity(user){
        user.quantity = user.quantity + 1
        this.state.quantity = user.quantity
        this.updateQuantity(user)
        console.log(user.quantity)
    }
    removeQuantity(user){
        if (user.quantity > 0){
            user.quantity = user.quantity - 1
        }
        this.updateQuantity(user)
        console.log(user.quantity)
    }
    updateQuantity(user) {
        this.setState({
            quantity: user.quantity,
            total: user.quantity*10
        })
    }
    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        this.state.lon = user.quantity;
        this.state.lat = user.quantity*10;
        return(
        <Container className="main" component="main">
            <div className="player">
                <BackGroundVideo/>
                <IconButton aria-label="back"
                            style={styles.myBack}
                            onClick={() => switchScreen(this.props, '/home')}>
                    <ArrowBack/>
                </IconButton>
                <div className="wrap">
                    <img className="wood" src={firewood}/>
                    <title className="firewood"> Firewood</title>
                    <hr style={styles.coloredLine} />
                    <></>
                    <div style={styles.myRow}>
                        <title style={styles.myItem}>Cost: </title>
                        <title style={styles.myTitle}>$10/bundle </title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItem}>Qty: </title>
                        <IconButton aria-label="add"
                                    style={styles.myIcon}
                                    onClick={() => this.addQuantity(user)}>
                            <Add fontSize="large" />
                        </IconButton>
                        <title style={styles.myTitle}>{this.state.quantity}</title>
                        <IconButton aria-label="remove"
                                    style={styles.myIcon}
                                    onClick={() => this.removeQuantity(user)}>
                            <Remove fontSize="large" />
                        </IconButton>
                    </div>
                    <hr style={styles.coloredLine} />
                    <div style={styles.myRow}>
                        <title style={styles.myItem}>Total: </title>
                        <title style={styles.myTitle}>${this.state.total}</title>
                    </div>
                    <div style={styles.myRow}>
                    <Button style={styles.myButton}
                            onClick={() => switchScreen(this.props, '/delivery')}>
                        Proceed to Delivery Info
                    </Button>
                    </div>
                </div>
            </div>
        </Container>
        );
    }

}

export default MenuPage;

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
    myIcon: {
        flexDirection:'row',
        position: 'relative',
        color: 'white',
    },
    myTitle: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        marginBottom:5
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
        display: 'block',
        margin: 'auto',
        textAlign: 'center',
        marginTop: 1,
        marginBottom: 10,
        width: "70%",
        color: 'white',
        backgroundColor: 'white',
        height: 1
    },
    myButton: {
        position: 'fixed',
        bottom: 0,
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
