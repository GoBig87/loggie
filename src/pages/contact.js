import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'


class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render()

    { return(

        <Container component="main" maxWidth="sm">
            <div className="App" >
                <BackGroundVideo/>
                <div style={styles.myDiv}>
                    <title style={styles.myTitle}>
                        Contact Info
                    </title>
                    <text style={styles.mySubtitle}>
                        Email
                    </text>
                    <body style={styles.myBody}>
                    admin@loggie.app
                    </body>
                    <text style={styles.mySubtitle}>
                        Phone
                    </text>
                    <body style={styles.myBody}>
                    858.203.3157
                    </body>
                </div>
            </div>
        </Container>
    );
    }
}
export default ContactPage;

// styles section
let styles = {
    myDiv: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        padding: 20,
        position: 'relative',
        width: '100%',
        borderRadius: '10px',
        background: '#77889980',
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
    },
    myTitle: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:10,
        marginBottom:20
    },
    mySubtitle: {
        position: 'relative',
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:20,
    },
    myBody: {
        position: 'relative',
        textAlign: 'left',
        display: 'flex',
        color: 'white',
        fontSize: 16,
        marginBottom:0
    },
    myParagraph: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItemstems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop:10,
        marginBottom:10
    }
}