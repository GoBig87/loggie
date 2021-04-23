import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import BackGroundVideo from '../components/backGroundVideo'


class AboutPage extends Component {
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
                        About Loggie
                    </title>
                    <text style={styles.mySubtitle}>
                        What is Loggie?
                    </text>
                    <body style={styles.myBody}>
                        Loggie is a locally owned and operated mobile firewood delivery
                        that serves the San Diego Mission Bay area.  Users can purchase
                        firewood and then select their fire pit to where to deliver the
                        firewood to.
                    </body>
                    <text style={styles.mySubtitle}>
                        Comparing Trailer volume vs store bought bundles
                    </text>
                    <body style={styles.myBody}>
                        Loggie uses a bike trailer to deliver firewood that can handle a
                        little over 2 cubic feet of firewood per delivery.  Loggie charges
                        $25 per trailer delivery. Store bought bundles of wood are around
                        0.75 cubic feet of wood and can range anywhere between $6-$9 per bundle.
                    </body>
                    <text style={styles.mySubtitle}>
                        Does Loggie allow for tipping?
                    </text>
                    <body style={styles.myBody}>
                        Loggie is owner operated and does not require or expect any tips and
                        does not charge any delivery fees.
                    </body>
                    <text style={styles.mySubtitle}>
                        How do I track my order?
                    </text>
                    <body style={styles.myBody}>
                        From the home page, click the account icon in the top right corner.
                        Inside the account page there will be a list of orders in chronological
                        order.  Click on the order you want to know the status of and it will
                        open a page with your order details.
                    </body>
                    <text style={styles.mySubtitle}>
                        Can I get firewood delivered outside of Mission Bay?
                    </text>
                    <body style={styles.myBody}>
                        Currently Loggie only delivers to fire pits on Crown Point and
                        Fiesta Island.
                    </body>
                    <text style={styles.mySubtitle}>
                        How Long are delivery times?
                    </text>
                    <body style={styles.myBody}>
                        Delivery times should take about 10-15 minutes.  I live a
                        couple blocks away from Crown Point park and I am short
                        scooter ride away.
                    </body>
                    <text style={styles.mySubtitle}>
                        Who do I look for my delivery driver?
                    </text>
                    <body style={styles.myBody}>
                        Keep an eye out for a guy riding an e-scooter with a
                        small bike trailer attached to it.
                    </body>
                    <text style={styles.mySubtitle}>
                        More questions about Loggie firewood delivery?
                    </text>
                    <body style={styles.myBody}>
                        Feel free to email any questions to admin@loggie.app
                    </body>
                </div>
            </div>
            </Container>
            );
        }
    }
export default AboutPage;

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