import React, { Component } from 'react';

class InfoComponent extends Component {

    render() {
       
        return (
                <div id="info">
                    <h2 id="info-h">Dziękujemy za rezerwację!</h2>
                Wstępna rezerwacja przebiegła pomyślnie. Na podany przez Ciebie adres e-mail została wysłana wiadomość. <b>UWAGA: Rezerwacja nie została jeszcze potwierdzona.
                Potwierdzenie lub ewentualne anulowanie wkrótce otrzymasz drogą mailową.</b><br /><br /> Dziękujemy za cierpliwość.<br/>
                <p id="info-p"><a href="/"><b>Wróć do strony głównej.</b></a></p>
            </div>

        );
    }
}

export default InfoComponent;