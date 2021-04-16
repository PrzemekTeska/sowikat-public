import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import React, { Component } from 'react';
import { TelephoneFill, EnvelopeFill, ClockFill } from 'react-bootstrap-icons';
import FooterMapComponent from './FooterMapComponent';

var d = new Date();
let currentYear = d.getFullYear();

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div>
                <footer className="footer">
                   
                    <div id="footer-center">
                        <div id="footer-contact">
                            <h5>KONTAKT</h5><br />
                            <ClockFill /><span> Recepcja czynna: 8:00-16:00</span><br />
                            <TelephoneFill /><span> (0048) 503094797</span><br />
                            <TelephoneFill /><span> (0048) 574109209</span><br />
                            <EnvelopeFill /><span> kontakt@sowikat.pl</span>
                            <div id="fb-icon"><a id="a-fb" href="https://www.facebook.com/Sowi-K%C4%85t-112837847568876"><FontAwesomeIcon size="1x" icon={faFacebook} /> facebook.com/sowi-kąt</a></div>
                        </div>
                        <div id="footer-localization">
                            <h5>LOKALIZACJA</h5><br/>
                            <FooterMapComponent/>
                        </div>
                        <div id="footer-regulations">
                            <h5>REGULAMINY</h5><br/>
                            <a className="footer-regulations-a" href="/regulamin-domkow">Regulamin domków</a><br/><br/>
                            <a className="footer-regulations-a" href="/regulamin-rezerwacji">Regulamin rezerwacji</a>
                        </div>

                    </div>
                    <div id="copyright">
                        <small>&copy; Copyright {currentYear} F.H.U. J&B s.c. | Service created by Przemysław Teska & Bartosz Rudź</small>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;