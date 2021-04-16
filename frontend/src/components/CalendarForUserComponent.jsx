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

function CalendarForUserComponent(props) {

    const ref = useRef(null);

    const [calEvents, setCalEvents] = useState([]);

    var convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    useEffect(() => {

        trackPromise(
        BookingService.getBookingsForUser()
            .then(response => {
                
                let bookings = response.data;
                let rezerwacja = [{"title":"", "houseId": "", "start": "", "end": "" }];

                for (let i = 0; i < bookings.length; i++) {

                    bookings[i].startDate = convertDate(bookings[i].startDate)
                    bookings[i].endDate = convertDate(bookings[i].endDate)
                    for (let x in bookings) {
                        rezerwacja[x] = {
                            title: "Domek nr " + bookings[x].houseId + " zajęty",
                            start: bookings[x].startDate,
                            end: bookings[x].endDate,
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
                                backgroundColor: "red",
                                color: 'white'
                            };

                            return {
                                className: "",
                                style: newStyle
                            };
                        }
                    }
                />
            </div>
        </div>
    );
}

export default CalendarForUserComponent;