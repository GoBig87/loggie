import React, { Component, useState } from "react";
import { IconButton, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Fireplace from "../assets/videos/Fireplace.mp4";
import 'react-phone-input-2/lib/style.css'
import './menu.css'


class ConfirmationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            render: true
        }
    }

    render() {
        const { switchScreen } = this.props.state;
        const { user } = this.props.state;
        return(
            <Container className="main" component="main" maxWidth="xs">
                <div className="player">
                    <video autoPlay muted loop className="video">
                        <source src={Fireplace} type="video/mp4"/>
                    </video>
                    <IconButton aria-label="back" style={styles.myBack} >
                        <ArrowBack/>
                    </IconButton>
                    <div className="wrap">
                        <title className="firewood" style={styles.myTitle}> Thank You!</title>
                        <div style={styles.myRow}>
                            <title style={styles.myItemLeft}>Bundles: </title>
                            <hr style={styles.coloredLine} />
                            <title style={styles.myItemRight}>$10 </title>
                        </div>
                        <div style={styles.myRow}>
                            <title style={styles.myItemLeft}>Qty: </title>
                            <hr style={styles.coloredLine} />
                            <title style={styles.myItemRight}>x1</title>
                        </div>
                        <div style={styles.myRow}>
                            <title style={styles.myItemLeft}>Total: </title>
                            <hr style={styles.coloredLine} />
                            <title style={styles.myItemRight}>$10</title>
                        </div>
                        <div style={styles.myRow}>
                            <Button style={styles.myButton} onClick={() => switchScreen(this.props, '/home')}>
                                Return Home
                            </Button>
                        </div>

                    </div>
                </div>
            </Container>
        );
    }

}

export default ConfirmationPage;

let styles = {
    myPhone: {
        width: "80%"
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
        marginTop:30,
        marginBottom:10
    },
    myItemLeft: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:10,
        marginTop:5,
        marginBottom:5
    },
    myItemRight: {
        flexDirection: "row",
        textAlign: 'center',
        display: 'flex',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:10,
        marginTop:5,
        marginBottom:5
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
