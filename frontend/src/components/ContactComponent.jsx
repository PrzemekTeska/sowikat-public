import React, { Component } from 'react';
import MapComponent from './MapComponent';
import prev1 from '../domkiprev1.png';
import { TelephoneFill, HouseFill, EnvelopeFill } from 'react-bootstrap-icons';
import Radium, { StyleRoot } from 'radium';
import { fadeInRight, fadeInLeft, fadeIn } from 'react-animations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import contact from "../kontakt.png"
import FooterComponent from './FooterComponent';


const styles = {
    fadeInRight: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
    },
    fadeInLeft: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')

    },
    fadeIn: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeIn,'fadeIn')
    }

}

class ContactComponent extends Component {
    render() {
        return (
            <div id="contactWrapper">
                <StyleRoot>
                    <div id="contact-div-prev1">
                        <img id="contact-img" style={styles.fadeIn} src={contact} alt="Kontakt"></img>

                        <img src={prev1} alt="preview" id="contact-img-prev1" />

                    </div>
                    <div id="contactContent">

                        <div id="contactData" style={styles.fadeInLeft}>
                            <h2>Sowi Kąt</h2><br/>
                            <p><HouseFill className="contact-icons" color="#343A40" size="24px"/> ul. Zawilca 15</p><p style={{ marginLeft: "4%" }}>84-210 Lubiatowo</p><br/>
                            <p><TelephoneFill className="contact-icons" color="#343A40" size="24px"/> +48 503 094 797</p>
                            <p><TelephoneFill className="contact-icons" color="#343A40" size="24px"/> +48 574 109 209</p> <br/>
                            <p><EnvelopeFill className="contact-icons" color="#343A40" size="24px"/> kontakt@sowikat.pl</p><br/>
                            <FontAwesomeIcon icon={faFacebook} color="#343A40" /><a id="a-fb-contact" href="https://www.facebook.com/Sowi-K%C4%85t-112837847568876"> facebook.com/sowi-kąt</a>
                        </div>

                        <div id="map" style={styles.fadeInRight}><MapComponent /></div>

                        <div className="contact-footer-position"><FooterComponent /></div>

                    </div>
                </StyleRoot>

            </div>

        );
    }
}

export default ContactComponent;