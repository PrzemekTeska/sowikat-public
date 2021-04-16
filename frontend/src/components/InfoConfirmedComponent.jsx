import React, { Component } from 'react';

class InfoConfirmedComponent extends Component {

    render() {

        return (
            <div id="info">
                <h2 id="info-h">Rezerwacja potwierdzona</h2>
                <p id="info-accepted">Rezerwacja domku przebiegła pomyślnie. Do zobaczenia w ustalonym terminie!</p>
                <p id="info-p"><a href="/"><b>Wróć do strony głównej.</b></a></p>
            </div>

        );
    }
}

export default InfoConfirmedComponent;