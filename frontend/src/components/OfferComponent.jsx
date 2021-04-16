import React, { Component } from 'react';

class OfferComponent extends Component {
    render() {
        return (
            <div>
                Każdy  dom składa się z:
                        <ul id="domki-desc-list">
                        <br/>
                            <li className="domki-desc-li">dwóch sypialni (w tym jedna z tarasem)</li>
                            <li>salonu z klimatyzacją oraz kominkiem</li>
                            <li>w pełni wyposażonej kuchni i łazienki</li>
                            <li>własnego trawnika i zadaszonego tarasu</li>
                        </ul>
            </div>
        );
    }
}

export default OfferComponent;