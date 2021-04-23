import React, { Component, useState } from "react";
import trailer from "../assets/images/trailer.png"
import { IconButton, Button, Card } from "@material-ui/core";
import {Remove, Add, ShoppingCart, ArrowBack} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import BackGroundVideo from '../components/backGroundVideo'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class MenuPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            total: 0,
            pricePerTrailer: 0,
        }
    }
    addQuantity(user){
        user.quantity = user.quantity + 1
        this.state.quantity = user.quantity
        this.updateQuantity(user)
    };

    removeQuantity(user){
        if (user.quantity > 0){
            user.quantity = user.quantity - 1
        }
        this.updateQuantity(user)
    };

    updateQuantity(user) {
        this.setState({
            quantity: user.quantity,
            total: user.quantity*user.pricePerTrailer
        })
    };

    proceedToDelivery = () => {
        if(this.state.quantity == 0){
            this.setState({open:true})
        }else{
            const { switchScreen } = this.props.state;
            switchScreen(this.props, '/delivery')
        }
    };

    render() {

        const { user } = this.props.state;
        this.state.quantity = user.quantity;
        this.state.total = user.quantity*user.pricePerTrailer;
        this.state.pricePerTrailer = user.pricePerTrailer;

        const handleClose = () => {
            this.setState({open: false});
        };

        return(
            <Container component="main" maxWidth="sm">
            <div className="App" >
                <BackGroundVideo/>
                <div style={styles.myDiv}>
                    <title style={styles.firewoodTitle}>Purchase Firewood</title>
                    <img style={styles.myImage} src={trailer}/>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Cost Per Trailer  (2 cu ft): </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>${this.} </title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Trailers: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>x {this.state.quantity} </title>
                    </div>
                    <div style={styles.myRow}>
                        <title style={styles.myItemLeft}>Total: </title>
                        <hr style={styles.coloredLine} />
                        <title style={styles.myItemRight}>${this.state.pricePerTrailer} </title>
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
                    <Button style={styles.myButton}
                            onClick={() => this.proceedToDelivery()}>
                        Proceed to Delivery Info
                    </Button>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            Quantity must be greater than 0
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </Container>
        );
    }

}

export default MenuPage;

let styles = {
    myItemLeft: {
        flexDirection: "row",
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:10,
        marginTop:5,
        marginBottom:5,
        whiteSpace: 'nowrap',
    },
    myItemRight: {
        flexDirection: "row",
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:10,
        marginTop:5,
        marginBottom:5,
        whiteSpace: 'nowrap',
    },
    firewoodTitle: {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textTransform: 'uppercase',
        paddingTop: 30,
    },
    myImage: {
        display: 'block',
        padding: '2em',
        height: '25vh',
        borderRadius: '20%',
        margin: 'auto',
    },
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
    myRow: {
        flexDirection:'row',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
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
        justifyContent: 'left',
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:15,
        marginTop:5,
        marginBottom:5
    },
    myDiv: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        padding: 20,
        position: 'relative',
        height: '90vh',
        width: '100%',
        borderRadius: '10px',
        background: '#77889980',
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
    },
    coloredLine: {
        position: 'relative',
        marginTop: 25,
        width: "90%",
        color: 'white',
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        height: 1
    },
    myButton: {
        position: 'relative',
        width:"80%",
        backgroundColor:"#fff59d",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        margin: 'auto',
    },
    pos: {
        marginBottom: 12,
    },
}
