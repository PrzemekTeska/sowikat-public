import React, { useState, useRef, useEffect } from 'react';
import BookingService from '../services/BookingService';
import UpdateBookingModalComponent from './UpdateBookingModalComponent'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { trackPromise } from 'react-promise-tracker';
import LoaderSpinnerComponent from './LoaderSpinnerComponent';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Alert from 'react-bootstrap/Alert'


const { SearchBar } = Search;

function ListBookingComponentTest(props) {
    const ref = useRef(null);
    const [bookings, setBookings] = useState([]);
    const [showConfirmationAlert, setConfirmationAlert] = useState(false);
    const [showCancelAlert, setCancelAlert] = useState(false);
    // const [searchValue, setSearchValue] = useState();
    // const [searchError, setSearchError] = useState();

    useEffect(() => {
        trackPromise(
            BookingService.getBookings().then((res) => {
                setBookings(res.data);
                
            }));
    }, [setBookings])

    function addBooking() {
        props.history.push('/admin/add-booking');
    }

    // function searchBooking() {
    //     setSearchError("");

    //     BookingService.getBookingsByValue(searchValue).then((res) => {
    //         
    //         setBookings(res.data);
    //         if (res.data.length === 0) setSearchError("Nie znaleziono wyników");
    //     });
    // }

    function deleteBooking(bookingId) {
        BookingService.deleteBooking(bookingId);
        window.location.reload();
    }

    const submit = (bookingId) => {
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
                    onClick: () => { }
                }
            ]
        });
    };

    const submitConfirm = (bookingId) => {
        confirmAlert({
            title: 'Potwierdzenie',
            message: 'Czy na pewno chcesz akceptować te rezerwację? Klient otrzyma wiadomość e-mail z informacją o akceptacji.',
            buttons: [
                {
                    label: 'Tak',
                    onClick: () => confirmBooking(bookingId)
                },
                {
                    label: 'Nie',
                    onClick: () => { }
                }
            ]
        });
    };

    const cancelConfirm = (bookingId) => {
        confirmAlert({
            title: 'Potwierdzenie',
            message: 'Czy na pewno chcesz anulować te rezerwację? Zostanie ona usunięta z systemu, a klient otrzyma wiadomość e-mail z informacją o anulowaniu.',
            buttons: [
                {
                    label: 'Tak',
                    onClick: () => cancelBooking(bookingId)
                },
                {
                    label: 'Nie',
                    onClick: () => { }
                }
            ]
        });
    };

    const buttons = (row) => (
        <>
            <button onClick={() => { ref.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edytuj</button>
            <button onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Usuń</button>
        </>
    )

    const buttonsToAcceptOrCancel = (row) => (
        <div style={{ textAlign: 'center'}}>
            <button style={{ fontSize: '12px', width:'77px', float:'left'}} onClick={() => { ref.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edytuj</button>
            <button style={{ fontSize: '12px', width:'60px'}} onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Usuń</button>
            <br/>
            <button style={{ fontSize: '12px', float:'left', marginTop:'3px', width:'77px'}} onClick={() => submitConfirm(row.id)} className="btn btn-success" id="confirmButton">Akceptuj</button>
            <button style={{ fontSize: '12px', marginTop:'3px', width:'60px' }} onClick={() => { cancelConfirm(row.id) }} className="btn btn-danger" id="cancelButton">Anuluj</button>

        </div>
    )

    const confirmBooking = (bookingId) => {
        setConfirmationAlert(true);
        setTimeout(() => {
            window.location.reload();

        }, 2000);

        trackPromise(BookingService.confirmBooking(bookingId));

    }

    const cancelBooking = (bookingId) => {
        setCancelAlert(true);
        setTimeout(() => {
            window.location.reload();
        }, 2000);

        trackPromise(BookingService.cancelBooking(bookingId));

    }

    // const changeSearchValueHandler = (event) => {
    //     setSearchValue(event);
    // }

    const columns = [{
        dataField: 'houseId',
        text: 'Numer domku',
        headerStyle: (colum, colIndex) => {
            
        }
    }, {
        dataField: 'firstName',
        text: 'Imię',
        headerStyle: (colum, colIndex) => {
           
        }
    }, {
        dataField: 'lastName',
        text: 'Nazwisko',
        headerStyle: (colum, colIndex) => {
         
        }
    }, {
        dataField: 'clientEmail',
        text: 'Email',
        headerStyle: (colum, colIndex) => {
         
        }

    }, {
        dataField: 'phoneNumber',
        text: 'Numer telefonu',
        headerStyle: (colum, colIndex) => {
          
        }
    }, {
        dataField: 'startDate',
        text: 'Od',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}.${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}.${dateObj.getUTCFullYear()}`;
        },
        headerStyle: (colum, colIndex) => {
           
        }
    }, {
        dataField: 'endDate',
        text: 'Do',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}.${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}.${dateObj.getUTCFullYear()}`;
        },
        headerStyle: (colum, colIndex) => {
           
        }
    }, {
        dataField: 'status',
        text: 'Status płatności',
        headerStyle: (colum, colIndex) => {
        
        }
    }, {
        text: 'Zarządzanie',
        isDummyField: true,
        formatter: (cell, row, rowIndex) => {
            if (row.status === "Rezerwacja wstępna") return buttonsToAcceptOrCancel(row);
            else return buttons(row);
        },
        headerStyle: (colum, colIndex) => {
            return { whiteSpace: "nowrap", width: "20%"};
        }
    }];


    return (
        <div id="containerBookingList">

            <div id="modalContent">

                <UpdateBookingModalComponent ref={ref} />
            </div>
            <h2 className="text-center">Lista rezerwacji</h2>
            <div className="row">



                <ToolkitProvider
                    keyField="id"
                    data={bookings}
                    columns={columns}
                    search

                >
                    {
                        props => (
                            <div>
                                <button id="calendarButton" className="btn btn-primary" onClick={addBooking}>Kalendarz</button>

                                <SearchBar {...props.searchProps}
                                    placeholder="Szukaj rezerwacji" />
                                <hr />
                                <Alert show={showConfirmationAlert} variant="success">
                                    <p>Rezerwacja akceptowana. Do klienta została wysłana wiadomość e-mail z potwierdzniem.</p>
                                </Alert>
                                <Alert show={showCancelAlert} variant="danger">
                                    <p>Rezerwacja anulowana. Do klienta została wysłana wiadomość e-mail z informacją.</p>
                                </Alert>
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                    hover
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <LoaderSpinnerComponent />

                {/* <h3 id="searchError">{searchError}</h3> */}
            </div>
        </div>
    );
}

export default ListBookingComponentTest;