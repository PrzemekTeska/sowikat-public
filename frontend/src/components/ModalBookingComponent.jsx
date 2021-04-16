import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap'
import BookingService from "../services/BookingService";
import UpdateBookingModalComponent from './UpdateBookingModalComponent'
import LoaderSpinnerComponent from './LoaderSpinnerComponent';
import { trackPromise } from 'react-promise-tracker';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ModalBookingComponent = forwardRef((props, ref) => {
    const [booking, setBooking] = useState({ startDate: '', endDate: '' });
    const [modalBody, setModalBody] = useState([]);

    const newRef = useRef(null);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (eventId) => {
        setBooking({ startDate: '', endDate: '' });
        setModalBody([<br />, <br />, <br />, <br />, <br />]);
        trackPromise(
            BookingService.getBookingById(eventId)
                .then(response => {
                    let booking = response.data;
                    
                    setBooking(booking);
                    setModalBody(["Numer domku: ", "Imię: ", "Nazwisko: ", "Email: ", "Numer telefonu: ", "Od: ", "Do: ", "Status płatności: "])
                }))
        setShow(true)
    };

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    useEffect(() => {

        
    }, [booking])

    function deleteBooking(bookingId) {
        BookingService.deleteBooking(bookingId);
        window.location.reload();
    }

    const submit = (bookingId) => {

        handleClose();

        confirmAlert({
          title: 'Potwierdzenie usuwania',
          message: 'Czy na pewno chcesz usunąć tę rezerwację?',
          buttons: [
            {
              label: 'Tak',
              onClick: () => deleteBooking(bookingId)
            },
            {
              label: 'Nie',
              onClick: () => {}
            }
          ]
        });
      };

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Szczegóły rezerwacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoaderSpinnerComponent />
                    <p><b>{modalBody[0]} </b>{booking.houseId}</p>
                    <p><b>{modalBody[1]} </b>{booking.firstName}</p>
                    <p><b>{modalBody[2]} </b>{booking.lastName}</p>
                    <p><b>{modalBody[3]} </b>{booking.clientEmail}</p>
                    <p><b>{modalBody[4]} </b>{booking.phoneNumber}</p>
                    <p><b>{modalBody[5]}</b>{booking.startDate}</p>
                    <p><b>{modalBody[6]}</b>{booking.endDate}</p>
                    <p><b>{modalBody[7]} </b>{booking.status}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { newRef.current.handleShow(booking) }}>
                        Edytuj
          </Button>
                    <Button variant="danger" onClick={() => {submit(booking.id)}}>
                        Usuń
          </Button>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Zamknij
          </Button>
                </Modal.Footer>
                <div id="modalContent">
                    <UpdateBookingModalComponent ref={newRef} />
                </div>
            </Modal>
        </>
    );

});

export default ModalBookingComponent;