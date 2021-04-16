import React, { Component } from 'react';
import BookingService from '../services/BookingService';
import '../App.css';
import CalendarTestComponent from './CalendarTestComponent';
import DatePicker from 'react-date-picker';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import tz from 'moment-timezone';


class CreateBookingComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            houseId: '1',
            firstName: '',
            lastName: '',
            clientEmail: '',
            phoneNumber: '',
            startDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
            endDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
            status: 'Rezerwacja wstępna',
            errors: {},
            disabledButton: false

        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.saveBooking = this.saveBooking.bind(this);
    }

    handleValidation(booking) {
        let formIsValid = true;
        let errors = {};

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
                    errors["date"] = "Niepoprawne daty!";
                }
            }
            else {
                formIsValid = false;
                errors["date"] = "Uzupełnij daty!";
            }

        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    showDateNotAvailable() {
        let errors = {};
        errors["dateAvailable"] = "Wybrany termin jest zajęty!";
        this.setState({errors: errors});
    }

    saveBooking = (e) => {
        e.preventDefault();
        // new Date().getFullYear(),new Date().getMonth() , new Date().getDate()

        var startDate = moment(this.state.startDate);
        var endDate = moment(this.state.endDate);

        let booking = {
            houseId: this.state.houseId, firstName: this.state.firstName, lastName: this.state.lastName, clientEmail: this.state.clientEmail,
            phoneNumber: this.state.phoneNumber, startDate: startDate.tz('Europe/Warsaw').format("YYYY-MM-DD"), endDate: endDate.tz('Europe/Warsaw').format("YYYY-MM-DD"), status: this.state.status
        };



        

        if (this.handleValidation(booking)) {
            this.setState({disabledButton:true})


            BookingService.createBooking(booking).then(res => {
                if (res.status === 201) {
                    this.props.history.push('/admin/bookings');
                }
                else {
                    this.setState({disabledButton:false})
                    this.showDateNotAvailable();
                    
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

    changeStatusHandler = (event) => {
        this.setState({ status: event })
    }


    cancel() {
        this.props.history.push('/admin/bookings');
    }

    render() {
        return (
            <div id="container-create-booking">
                <div className="card" id="wrapper-create-booking">


                    <h3 className="text-center">Dodawanie rezerwacji</h3>
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
                                <label> Imię: </label>
                                <input placeholder="Imię" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                            </div>
                            <div className="form-group">
                                <label> Nazwisko: </label>
                                <input placeholder="Nazwisko" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                            </div>
                            <div className="form-group">
                                <label> Adres e-mail: </label>
                                <input placeholder="Adres e-mail" name="clientEmail" className="form-control" value={this.state.clientEmail} onChange={this.changeClientEmailHandler} />
                                <span style={{ color: "red" }}>{this.state.errors["clientEmail"]}</span>
                            </div>
                            <div className="form-group">
                                <label> Numer telefonu: </label>
                                <PhoneInput placeholder="Numer telefonu" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} defaultCountry="PL" />
                                <span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
                            </div>
                            <div className="form-group">
                                <label> Data rozpoczęcia rezerwacji: </label>
                                <DatePicker
                                    onChange={this.changeStartDateHandler}
                                    value={this.state.startDate}
                                    format="yyyy-MM-dd" />
                            </div>

                            <div className="form-group">
                                <label> Data zakończenia rezerwacji: </label>
                                <DatePicker
                                    onChange={this.changeEndDateHandler}
                                    value={this.state.endDate}
                                    format="yyyy-MM-dd"
                                />
                                <br/>
                                <span style={{ color: "red" }}>{this.state.errors["date"]}</span>
                                <span style={{ color: "red" }}>{this.state.errors["dateAvailable"]}</span>
                            </div>
                            <div className="form-group">
                                <label> Status rezerwacji: </label>
                                <DropdownButton
                                    alignRight
                                    title={this.state.status}
                                    id="dropdown-menu-align-right"
                                    menuAlign={{ lg: 'left' }}
                                    onSelect={this.changeStatusHandler}
                                >
                                    <Dropdown.Item eventKey="Rezerwacja wstępna" id="dropdown1">Rezerwacja wstępna</Dropdown.Item>
                                    <Dropdown.Item eventKey="Rezerwacja potwierdzona" id="dropdown2">Rezerwacja potwierdzona</Dropdown.Item>
                                    <Dropdown.Item eventKey="Rezerwacja + zaliczka" id="dropdown3">Rezerwacja + zaliczka</Dropdown.Item>
                                    <Dropdown.Item eventKey="Rezerwacja rozliczona" id="dropdown4">Rezerwacja rozliczona</Dropdown.Item>

                                </DropdownButton>
                            </div>


                            <button className="btn btn-success" onClick={this.saveBooking} disabled={this.state.disabledButton}>Dodaj</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Anuluj</button>
                        </form>
                    </div>

                </div>

                <div id="calendar">

                    <Card><CalendarTestComponent /></Card>



                </div>

            </div>

        );
    }
}

export default CreateBookingComponent;