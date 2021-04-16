import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import FooterComponent from './FooterComponent';
import header from '../regulaminrezerwacji.png'

const styles = {
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }

}


class BookingRegulations extends Component {


    render() {

        return (
            <div className="box-wrapper">
                <StyleRoot>
                    <div className="box-bg" style={styles.fadeIn}>
                        <img src={header} id="booking-regulations-img" alt="Regulamin rezerwacji"/>
                        <div id="regulations-content">
                        <ol>
                            <li>Sowi Kąt przyjmuje rezerwacje poprzez kontakt<br />
                            • kontakt@sowikat.pl<br />
                                • tel. +48 503 094 797<br />
                                    • https://www.sowikat.pl<br />
                                        • portale rezerwacyjne typu booking.com</li>
                            <li>Osoba dokonująca rezerwacji zobowiązana jest do podania prawidłowych danych osobowych, nr. tel. ilości gości oraz długości pobytu. Osoba rezerwująca wyraża zgodę na umieszczenie swoich danych w systemie hotelowym.</li>
                            <li>Rezerwację uznaje się za potwierdzoną po wpłaceniu zadatku w wysokości 30% wartości usługi na konto Sowiego Kątu. Płatność należy wykonać w terminie uzgodnionym z Recepcją nie później niż 14 dni od dnia dokonania rezerwacji.<br />
                            Nie wpłacenie zadatku w wyznaczonym terminie powoduje automatyczną anulację rezerwacji.<br />
                                            Datą wpłaty zadatku jest data wpływu środków na r-k bankowy obiektu.<br />
                                                Zadatek wpłacany jest na konto bankowe podane poniżej z podaniem imienia i nazwiska Gościa i daty rezerwacji:FHU J&amp;B sc<br />
                                                    ul.Łąkowa 3 , 84-230 Rumia<br />
                                                        nr konta 80 8351 0003 0014 2999 2000 0010</li>
                            <li>Wpłata zadatku i tym samym dokonanie skutecznej rezerwacji pobytu oznacza akceptację warunków Regulaminu Sowiego Kątu</li>
                            <li>Zapłata za pobyt następuje w dniu przyjazdu przed rozpoczęciem pobytu. Zapłata 100% ceny za pobyt stanowi zawarcie Umowy między klientem a Sowim Kątem na pobyt wg. zamówienia. Odmowa zapłaty za cały pobyt przed jego rozpoczęciem w dniu przyjazdu stanowi odstąpienie klienta od rezerwacji. Sowi Kąt zachowa wpłacony zadatek.</li>
                            <li>Gość może rozpocząć pobyt w dowolnym czasie pierwszej doby hotelowej z zadatkowanego terminu. W przypadku nie dojazdu w czasie trwania pierwszej doby hotelowej Sowi Kąt nie będzie związany rezerwacją i zachowa wpłacony zadatek.</li>
                            <li>W przypadku skrócenia pobytu przez gościa Sowi Kąt nie zwraca kosztów jednostronnego odstąpienia od zawartej Umowy.</li>
                            <li>Rezerwacja za pośrednictwem booking.com i innych portali rezerwacyjnych odbywa się na zasadach określonych na stronie tych portali.</li>
                            <li>Zmiana terminu rezerwacji zależy każdorazowo od indywidualnej oceny sytuacji przez obiekt oraz możliwości dokonania zmiany. Sowi Kąt zastrzega, że zmiana terminu pobytu nie może narażać obiektu na straty, a postulat Klienta zmiany terminu w żaden sposób nie wiąże Sowiego Kątu.</li>
                            <li>W przypadku anulowania rezerwacji na więcej niż 7 dni przed dniem przyjazdu zwracamy 100% zadatku.</li>
                            <li>W przypadku anulowania rezerwacji na 7 lub mniej dni przed przyjazdem wpłacona kwota zadatku nie podlega zwrotowi.</li>
                        </ol>
                        </div>
                        <div className="footer-position-mobile" style={{ visibility: 'hidden' }}><FooterComponent /></div>

                    </div>
                </StyleRoot>
                <div className="footer-position"><FooterComponent /></div>
            </div>

        );
    }
}

export default BookingRegulations;