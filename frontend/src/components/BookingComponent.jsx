import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeInDown, fadeInUp, fadeInRight, fadeInLeft, fadeIn } from 'react-animations'
import CalendarForUserComponent from './CalendarForUserComponent';
import DatePicker from 'react-date-picker';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import BookingService from '../services/BookingService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom';
import FooterComponent from './FooterComponent';
import moment from 'moment';
import tz from 'moment-timezone';

const styles = {
    fadeInUp: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
    },
    fadeInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')

    },
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
        animationName: Radium.keyframes(fadeIn, 'fadeIn')

    }

}


class BookingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            houseId: '1',
            firstName: '',
            lastName: '',
            clientEmail: '',
            phoneNumber: '',
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            status: 'Rezerwacja wstępna',
            code: '',
            errors: {},
            buttonDisabled: false,
            redirect: false

        }


        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.saveBooking = this.saveBooking.bind(this);
    }

    handleValidation(booking) {
        let formIsValid = true;
        let errors = {};
        var startDate = new Date(booking.startDate);
        var endDate = new Date(booking.endDate);

        if (booking.firstName !== "") {
            if (typeof booking.firstName !== "undefined") {
                if (!booking.firstName.match(/^[\s\p{L}]+$/u)) {
                    formIsValid = false;
                    errors["firstName"] = "Używaj tylko liter!";
                }
            }

        }
        else {
            formIsValid = false;
            errors["firstName"] = "Uzupełnij pole!";
        }

        if (booking.lastName !== "") {
            if (typeof booking.lastName !== "undefined") {
                if (!booking.lastName.match(/^[\s\p{L}]+$/u)) {
                    formIsValid = false;
                    errors["lastName"] = "Używaj tylko liter!";
                }
            }

        }
        else {
            formIsValid = false;
            errors["lastName"] = "Uzupełnij pole!";
        }

        if (booking.clientEmail !== "") {
            if (typeof booking.clientEmail !== "undefined") {
                let lastAtPos = booking.clientEmail.lastIndexOf('@');
                let lastDotPos = booking.clientEmail.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && booking.clientEmail.indexOf('@@') === -1 && lastDotPos > 2 && (booking.clientEmail.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["clientEmail"] = "Nieprawidłowy email!";
                }
            }

        }
        else {
            formIsValid = false;
            errors["clientEmail"] = "Uzupełnij pole!";
        }

        if (booking.phoneNumber !== "") {
            if (!isValidPhoneNumber(booking.phoneNumber)) {
                formIsValid = false;
                errors["phoneNumber"] = "Nieprawdiłowy numer telefonu!";

            }
        }
        else {
            formIsValid = false;
            errors["phoneNumber"] = "Uzupełnij pole!";
        }

        if (booking.startDate !== "" && booking.endDate !== "") {
            if (booking.startDate !== null && booking.endDate !== null) {
                if (booking.startDate > booking.endDate) {
                    formIsValid = false;
                    errors["invalidDate"] = "Niepoprawne daty!";
                }


                if ((startDate.getMonth() === 6 && endDate.getMonth() === 6) || (startDate.getMonth() === 7 && endDate.getMonth() === 7)) {
                    if ((endDate.getTime() - startDate.getTime() < 604800000)) {
                        formIsValid = false;
                        errors["invalidDate"] = "W sezonie wakacyjnym rezerwacje możliwe na co najmniej tydzień!"
                    }
                }
            }
            else {
                formIsValid = false;
                errors["invalidDate"] = "Uzupełnij daty!";
            }

        }





        this.setState({ errors: errors });
        return formIsValid;
    }


    submit = (e) => {

        e.preventDefault();
        let booking = {
            houseId: this.state.houseId, firstName: this.state.firstName, lastName: this.state.lastName, clientEmail: this.state.clientEmail,
            phoneNumber: this.state.phoneNumber, startDate: this.state.startDate, endDate: this.state.endDate, status: this.state.status
        };

        
        if (this.handleValidation(booking)) {
            confirmAlert({
                title: 'Potwierdzenie',
                message: 'Czy potwierdzasz tę rezerwację?',
                buttons: [
                    {
                        label: 'Tak',
                        onClick: this.saveBooking
                    },
                    {
                        label: 'Nie',
                        onClick: () => { }
                    }
                ]
            });
        }
    };

    saveBooking = () => {
        // e.preventDefault();
        var startDate = moment(this.state.startDate);
        var endDate = moment(this.state.endDate);

        let booking = {
            houseId: this.state.houseId, firstName: this.state.firstName, lastName: this.state.lastName, clientEmail: this.state.clientEmail,
            phoneNumber: this.state.phoneNumber, startDate: startDate.tz('Europe/Warsaw').format("YYYY-MM-DD"), endDate: endDate.tz('Europe/Warsaw').format("YYYY-MM-DD"), status: this.state.status
        };



        
        

        if (this.handleValidation(booking)) {
            this.setState({ buttonDisabled: true })



            BookingService.bookByUser(booking).then(res => {
                
                if (res.status === 201) {
                    this.setState({ redirect: true })
                    this.setState({ buttonDisabled: false })
                    BookingService.sendMailToAdmin(booking).then(res => {
                        
                    })
                }
                else {
                    let errors = {};
                    errors["date"] = "Wybrany termin dla domku nr " + booking.houseId + " jest zajęty!";
                    this.setState({ errors: errors });
                    this.setState({ buttonDisabled: false })
                    
                }
            });
        }
    }

    changeHouseIdHandler = (event) => {
        this.setState({ houseId: event });
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeClientEmailHandler = (event) => {
        this.setState({ clientEmail: event.target.value });
    }

    changePhoneNumberHandler = (event) => {
        this.setState({ phoneNumber: event });
    }

    changeStartDateHandler = (event) => {
        this.setState({ startDate: event });
    }

    changeEndDateHandler = (event) => {
        this.setState({ endDate: event });

    }



    render() {

        let booking = {
            houseId: this.state.houseId, firstName: this.state.firstName, lastName: this.state.lastName, clientEmail: this.state.clientEmail,
            phoneNumber: this.state.phoneNumber, startDate: this.state.startDate, endDate: this.state.endDate, status: this.state.status
        };
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{
                pathname: '/rezerwacje/info',
                booking: booking
            }} />;
        }

        return (
            <StyleRoot>
                <div id="booking-wrapper" style={styles.fadeIn}>

                    <div id="booking-bg" >
                        <div classname="card" id="booking-form">
                            <h4 className="text-center">Rezerwacja domku</h4>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Numer domku: </label>
                                        <DropdownButton
                                            alignRight
                                            title={this.state.houseId}
                                            id="dropdown-menu-align-right"
                                            menuAlign={{ lg: 'left' }}
                                            onSelect={this.changeHouseIdHandler}
                                        >
                                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                            <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                            <Dropdown.Item eventKey="5">5</Dropdown.Item>

                                        </DropdownButton>
                                    </div>
                                    <div className="form-group">
                                        <input placeholder="Imię" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                        <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                                    </div>
                                    <div className="form-group">
                                        <input placeholder="Nazwisko" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                        <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                                    </div>
                                    <div className="form-group">
                                        <input placeholder="Adres e-mail" name="clientEmail" className="form-control" value={this.state.clientEmail} onChange={this.changeClientEmailHandler} />
                                        <span style={{ color: "red" }}>{this.state.errors["clientEmail"]}</span>
                                    </div>
                                    <div className="form-group">
                                        <PhoneInput placeholder="Numer telefonu" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} defaultCountry="PL" />
                                        <span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
                                    </div>
                                    <div className="form-group">
                                        <label> Data rozpoczęcia rezerwacji: </label>
                                        <DatePicker
                                            onChange={this.changeStartDateHandler}
                                            value={this.state.startDate}
                                            format="yyyy-MM-dd"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Data zakończenia rezerwacji: </label>
                                        <DatePicker
                                            onChange={this.changeEndDateHandler}
                                            value={this.state.endDate}
                                            format="yyyy-MM-dd"
                                        />
                                        <br />
                                        <span style={{ color: "red" }}>{this.state.errors["invalidDate"]}</span>

                                    </div>


                                    <button className="btn btn-secondary" onClick={this.submit} disabled={this.state.buttonDisabled}>
                                        {this.state.buttonDisabled && (
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        )}
                                        {!this.state.buttonDisabled && <span>Rezerwuj</span>}
                                        {this.state.buttonDisabled && <span> Proszę czekać...</span>}
                                    </button><br /><br />
                                    <span style={{ color: "red" }}>{this.state.errors["date"]}</span>

                                </form>
                            </div>
                        </div>

                        <div id="calendar-for-user">
                            <p id="p-calendar-info"><b>Informacja: aby upewnić się, że termin nie jest zajęty, kliknij w zakładkę "Tydzień"</b></p>
                            <CalendarForUserComponent />

                        </div>
                        <div className="footer-position-mobile" style={{ visibility: 'hidden' }}><FooterComponent /></div>


                    </div>


                    <div className="footer-position"><FooterComponent /></div>

                </div>
            </StyleRoot>

        );
    }
}

export default BookingComponent;