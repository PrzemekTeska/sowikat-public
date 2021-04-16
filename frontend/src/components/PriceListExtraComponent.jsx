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


class PriceListExtraComponent extends Component {


    render() {

        return (
            <div className="box-wrapper">
                <StyleRoot>
                    <div className="box-bg-extra" style={styles.fadeIn}>
                        <img id="cennik-img" src={cennik} alt="cennik"/>
                        <div id="price-list-table-extra">
                            <div id="top-table">
                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Usługi dodatkowe</th>
                                        <th>Cena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>wymiana pościeli 1 kpl</td>
                                        <td>35 zł</td>
                                    </tr>
                                    <tr>
                                        <td>wymiana ręczników 1 kpl</td>
                                        <td>15 zł</td>
                                    </tr>
                                    <tr>
                                        <td>sprzątanie domu na koniec pobytu</td>
                                        <td>150 zł</td>
                                    </tr>
                                    <tr>
                                        <td>drewno do kominka wg zużycia</td>
                                        <td>?</td>
                                    </tr>
                                    <tr>
                                        <td>zgubienie kluczy</td>
                                        <td>100 zł</td>
                                    </tr>
                                    <tr>
                                        <td>pranie tapicerki kanapy</td>
                                        <td>?</td>
                                    </tr>
                                    <tr>
                                        <td>malowanie ścian (malowaniu podlega cała zabrudzona ściana)</td>
                                        <td>?</td>
                                    </tr>
                                </tbody>

                            </Table>
                            </div>
                            <div id="bottom-table">
                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Wyposażenie</th>
                                        <th>Cena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>kuchenka mikrofalowa</td>
                                        <td>700 zł</td>
                                    </tr>
                                    <tr>
                                        <td>płyta indukcyjna</td>
                                        <td>700 zł</td>
                                    </tr>
                                    <tr>
                                        <td>piekarnik</td>
                                        <td>700 zł</td>
                                    </tr>
                                    <tr>
                                        <td>zmywarka do naczyń</td>
                                        <td>1500 zł</td>
                                    </tr>
                                    <tr>
                                        <td>porcelana (talerze, kubki itp.)</td>
                                        <td>5 zł/szt</td>
                                    </tr>
                                    <tr>
                                        <td>patelnia</td>
                                        <td>50 zł</td>
                                    </tr>
                                    <tr>
                                        <td>garnki</td>
                                        <td>20 zł/szt</td>
                                    </tr>
                                    <tr>
                                        <td>krzesło</td>
                                        <td>180 zł</td>
                                    </tr>
                                    <tr>
                                        <td>stół</td>
                                        <td>200 zł</td>
                                    </tr>
                                    <tr>
                                        <td>szyba kominka</td>
                                        <td>1000 zł</td>
                                    </tr>
                                    <tr>
                                        <td>telewizor</td>
                                        <td>1900 zł</td>
                                    </tr>
                                    <tr>
                                        <td>klimatyzator</td>
                                        <td>2500 zł</td>
                                    </tr>
                                    <tr>
                                        <td>umywalka</td>
                                        <td>500 zł</td>
                                    </tr>
                                    <tr>
                                        <td>miska klozetowa</td>
                                        <td>900 zł</td>
                                    </tr>
                                    <tr>
                                        <td>ścianka przysznicowa</td>
                                        <td>900 zł</td>
                                    </tr>
                                </tbody>

                            </Table>
                            </div>

                        </div>
                        <div className="footer-position-mobile" style={{visibility:'hidden'}}><FooterComponent /></div>
                    </div>
                </StyleRoot>
                <div className="footer-position"><FooterComponent /></div>
            </div>

        );
    }
}

export default PriceListExtraComponent;