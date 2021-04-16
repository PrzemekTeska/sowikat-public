import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { render } from 'react-dom'
import { Modal, Button } from 'react-bootstrap';
import BookingService from "../services/BookingService";
import DatePicker from 'react-date-picker';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const ModalBookingComponent = forwardRef((props, ref) => {
    const [booking, setBooking] = useState({});
    const [errors, setErrors] = useState({});
    const [disabledButton, setButton] = useState(false);


    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (booking) => {

        setBooking({ ...booking, startDate: new Date(booking.startDate), endDate: new Date(booking.endDate) });
        setButton(false);
        setShow(true)
    };

    const updateBooking = (e) => {


        
        e.preventDefault();



        if (handleValidation(booking)) {
            setButton(true);
            BookingService.updateBooking(booking).then(res => {
                if (res.status === 200) {
                    handleClose();
                    window.location.reload();
                }
                else {
                    
                }
            });
        }
        else {
        }
    }

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    useEffect(() => {
        

    }, [booking, errors])

    const changeHouseIdHandler = (e) => {
        setBooking({ ...booking, houseId: e })
    }

    const changeFirstNameHandler = (e) => {
        setBooking({ ...booking, firstName: e.target.value })
    }

    const changeLastNameHandler = (e) => {
        setBooking({ ...booking, lastName: e.target.value })
    }

    const changeClientEmailHandler = (e) => {
        setBooking({ ...booking, clientEmail: e.target.value })
    }

    const changePhoneNumberHandler = (e) => {
        setBooking({ ...booking, phoneNumber: e })
    }

    const changeStartDateHandler = (e) => {
        setBooking({ ...booking, startDate: e })
    }

    const changeEndDateHandler = (e) => {
        setBooking({ ...booking, endDate: e })
    }

    const changeStatusHandler = (e) => {
        setBooking({ ...booking, status: e })
    }

    function handleValidation(booking) {
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


        setErrors(errors);

        render(<p style={{ color: "red" }}>{errors.firstName}</p>, document.getElementById('firstNameError'))
        render(<p style={{ color: "red" }}>{errors.lastName}</p>, document.getElementById('lastNameError'))
        render(<p style={{ color: "red" }}>{errors.clientEmail}</p>, document.getElementById('clientEmailError'))
        render(<p style={{ color: "red" }}>{errors.phoneNumber}</p>, document.getElementById('phoneNumberError'))
        render(<p style={{ color: "red" }}>{errors.date}</p>, document.getElementById('dateError'))


        return formIsValid;
    }

    return (
        <>
            <Modal id="update-modal" centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edycja rezerwacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Numer domku: </label>
                                    <DropdownButton
                                        alignRight
                                        title={booking.houseId}
                                        id="dropdown-menu-align-right"
                                        menuAlign={{ lg: 'left' }}
                                        onSelect={changeHouseIdHandler}
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
                                    <input placeholder="Imię" name="firstName" className="form-control" value={booking.firstName} onChange={changeFirstNameHandler} />
                                    <span id="firstNameError"></span>

                                </div>
                                <div className="form-group">
                                    <label> Nazwisko: </label>
                                    <input placeholder="Nazwisko" name="lastName" className="form-control" value={booking.lastName} onChange={changeLastNameHandler} />
                                    <span id="lastNameError"></span>
                                </div>
                                <div className="form-group">
                                    <label> Adres e-mail: </label>
                                    <input placeholder="Adres e-mail" name="clientEmail" className="form-control" value={booking.clientEmail} onChange={changeClientEmailHandler} />
                                    <span id="clientEmailError"></span>
                                </div>
                                <div className="form-group">
                                    <label> Numer telefonu: </label>
                                    <PhoneInput placeholder="Numer telefonu" value={booking.phoneNumber} onChange={changePhoneNumberHandler} defaultCountry="PL" />
                                    <span id="phoneNumberError"></span>
                                </div>
                                <div className="form-group">
                                    <label> Data rozpoczęcia rezerwacji: </label> <br />
                                    <DatePicker
                                        onChange={changeStartDateHandler}
                                        value={booking.startDate}
                                        format="yyyy-MM-dd"
                                    />
                                </div>

                                <div className="form-group">
                                    <label> Data zakończenia rezerwacji: </label> <br />
                                    <DatePicker
                                        onChange={changeEndDateHandler}
                                        value={booking.endDate}
                                        format="yyyy-MM-dd"
                                    />
                                    <span id="dateError"></span>
                                </div>
                                <div className="form-group">
                                    <label> Status rezerwacji: </label>
                                    <DropdownButton
                                        alignRight
                                        title={booking.status}
                                        id="dropdown-menu-align-right"
                                        menuAlign={{ lg: 'left' }}
                                        onSelect={changeStatusHandler}
                                    >
                                        <Dropdown.Item eventKey="Rezerwacja wstępna" id="dropdown1">Rezerwacja wstępna</Dropdown.Item>
                                        <Dropdown.Item eventKey="Rezerwacja potwierdzona" id="dropdown2">Rezerwacja potwierdzona</Dropdown.Item>
                                        <Dropdown.Item eventKey="Rezerwacja + zaliczka" id="dropdown3">Rezerwacja + zaliczka</Dropdown.Item>
                                        <Dropdown.Item eventKey="Rezerwacja rozliczona" id="dropdown4">Rezerwacja rozliczona</Dropdown.Item>

                                    </DropdownButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateBooking} disabled={disabledButton} >
                        Zatwierdź
          </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Anuluj
          </Button>
                </Modal.Footer>
                <div id="modalContent"></div>
            </Modal>

        </>
    );

});

export default ModalBookingComponent;