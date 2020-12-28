import React, { Component } from 'react';
import Fireplace from "../assets/videos/Fireplace.mp4";



class BackGroundVideo extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <video autoPlay muted loop playsinline="true" disablePictureInPicture="true" style={styles.myVideo}>
                <source src={Fireplace} type="video/mp4"/>
            </video>

        );
    }
}

export default BackGroundVideo;

let styles = {
    myVideo: {
        objectFit: 'cover',
        position: 'fixed',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    },
}