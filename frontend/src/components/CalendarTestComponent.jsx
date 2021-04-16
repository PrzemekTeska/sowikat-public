import React, { useRef, useEffect , useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BookingService from '../services/BookingService';
import ModalBookingComponent from './ModalBookingComponent';
import { trackPromise } from 'react-promise-tracker';

require('moment/locale/pl.js');

moment.locale("pl");
const localizer = momentLocalizer(moment);

const messages = {
    previous: 'Poprzedni',
    next: 'Następny',
    today: 'Dzisiaj',
    month: 'Miesiąc',
    week: 'Tydzień',
    showMore: function (e) {
        return '+' + e + ' więcej'
    }
};

function CalendarTestComponent(props) {

    const ref = useRef(null);

    const [calEvents, setCalEvents] = useState([]);

    var convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    useEffect(() => {

        trackPromise(
        BookingService.getBookings()
            .then(response => {
                
                let bookings = response.data;
                let rezerwacja = [{ "title": "", "start": "", "end": "", "status": "", "id": "" }];

                for (let i = 0; i < bookings.length; i++) {

                    bookings[i].startDate = convertDate(bookings[i].startDate)
                    bookings[i].endDate = convertDate(bookings[i].endDate)
                    for (let x in bookings) {
                        rezerwacja[x] = {
                            title: bookings[x].houseId + ": " + bookings[x].lastName + " " + bookings[x].firstName,
                            start: bookings[x].startDate,
                            end: bookings[x].endDate,
                            status: bookings[x].status,
                            id: bookings[x].id
                        }
                    }
                }
                setCalEvents(rezerwacja);

            })
            .catch(function (error) {
                
            }));
    }, []);

    return (
        <div id="modalWrapper">
            <div id="modalContent">
             <ModalBookingComponent ref={ref} />
            </div>
            <div>
            
                <Calendar
                    localizer={localizer}
                    messages={messages}
                    events={calEvents}
                    selectable={true}
                    step={30}
                    defaultView='month'
                    views={['month', 'week']}
                    defaultDate={new Date()}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "lightgrey",
                                color: 'black'
                            };

                            if (event.status.includes("Rezerwacja wstępna")) {
                                newStyle.backgroundColor = "#eaff61"
                            }
                            else if (event.status.includes("Rezerwacja potwierdzona")) {
                                newStyle.backgroundColor = "#cbfff1"
                            }
                            else if (event.status.includes("Rezerwacja + zaliczka")) {
                                newStyle.backgroundColor = "#61ff7b"
                            }
                            else if (event.status.includes("Rezerwacja rozliczona")) {
                                newStyle.backgroundColor = "#31793d"
                            }
                            else {
                                newStyle.backgroundColor = "orange"
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }
                    }
                    onSelectEvent={(event) => {ref.current.handleShow(event.id)}}
                />
            </div>
        </div>
    );
}

export default CalendarTestComponent;