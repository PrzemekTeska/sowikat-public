import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import FooterComponent from './FooterComponent';
import { Table } from 'react-bootstrap';
import cennik from '../cennik.png';

const styles = {
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }

}


class PriceListComponent extends Component {


    render() {

        return (
            <div className="box-wrapper">
                <StyleRoot>
                    <div className="box-bg" style={styles.fadeIn}>
                        <img id="cennik-img" src={cennik} alt="cennik"/>
                        <div id="price-list-table">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Termin</th>
                                        <th>Cena (za dobę)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>poza sezonem*</td>
                                        <td>od 400 zł</td>
                                    </tr>
                                    <tr>
                                        <td>maj, czerwiec, wrzesień</td>
                                        <td>od 500 zł</td>
                                    </tr>
                                    <tr>
                                        <td>lipiec, sierpień</td>
                                        <td>od 600 zł</td>
                                    </tr>
                                    <tr>
                                        <td>długi weekend**</td>
                                        <td>od 600 zł</td>
                                    </tr>
                                </tbody>

                            </Table>
                        </div>
                        <div id="price-list-content">
                        * poza sezonem - styczeń, luty, marzec, kwiecień, październik, listopad, grudzień<br/>
                        ** długi weekend - weekend, w którym dzień sąsiadujący bezpośrednio z sobotą lub niedzielą jest dniem wolnym od pracy<br/><br/>
                        <p id="price-list-p"><b>W sezonie (lipiec, sierpień) wynajem możliwy na minimum tydzień.</b></p>
                        <a href="/cennik-dodatkowy"><p id="price-list-extra">Cennik usług dodatkowych</p></a>
                        </div>
                        <div className="footer-position-mobile" style={{visibility:'hidden'}}><FooterComponent /></div>
                    </div>
                </StyleRoot>
                <div className="footer-position"><FooterComponent /></div>
            </div>

        );
    }
}

export default PriceListComponent;