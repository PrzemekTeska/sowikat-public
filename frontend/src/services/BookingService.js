import axios from 'axios';

// const BOOKING_API_BASE_URL = "http://localhost:8080/api/v1/admin/bookings";
// const BOOKING_API_USER_BASE_URL = "http://localhost:8080/api/v1/user/bookings"
// const AUTH_URL = "http://localhost:8080/authenticate";
// const CHECK_URL = "http://localhost:8080/checkauth";

const BOOKING_API_BASE_URL = "https://api.sowikat.pl/api/v1/admin/bookings";
const BOOKING_API_USER_BASE_URL = "https://api.sowikat.pl/api/v1/user/bookings";
const AUTH_URL = "https://api.sowikat.pl/authenticate";
const CHECK_URL = "https://api.sowikat.pl/checkauth";

class BookingService {


    getBookings() {
        return axios.get(BOOKING_API_BASE_URL);
    }

    getBookingsForUser() {
        return axios.get(BOOKING_API_USER_BASE_URL);
    }

    bookByUser(booking) {
        return axios.post(BOOKING_API_USER_BASE_URL, booking);
    }

    getBookingsByValue(value) {
        return axios.get(BOOKING_API_BASE_URL + "/search/" + value);
    }

    createBooking(booking) {
        return axios.post(BOOKING_API_BASE_URL, booking);
    }

    // getBookingsByHouseId(houseId) {
    //     return axios.get(BOOKING_API_BASE_URL + "/" + houseId)
    // }

    getBookingById(id) {
        return axios.get(BOOKING_API_BASE_URL + "/" + id);
    }

    updateBooking(booking) {
        return axios.put(BOOKING_API_BASE_URL, booking);
    }

    deleteBooking(id) {
        return axios.delete(BOOKING_API_BASE_URL + "/" + id);

    }

    authenticate(user) {
        return axios.post(AUTH_URL, user);
    }

    checkAuth() {
       return axios.get(CHECK_URL);
    }

    sendMailToAdmin(booking) {
        return axios.post(BOOKING_API_USER_BASE_URL + "/mail/", booking);
    }

    confirmBooking(id) {
        return axios.patch(BOOKING_API_BASE_URL + "/confirm/" + id);
    }

    cancelBooking(id) {
        return axios.delete(BOOKING_API_BASE_URL + "/cancel/" + id);
    }

    setupInterceptors = (history) => {

        axios.interceptors.response.use(response => {
          return response;
        }, error => {
  
        // if (error.response.status === 401) {
        //   store.dispatch(logoutUser());
        // }
  
        // if (error.response.status === 401) {
        //    history.push('/');
        //    window.location.reload();
        // }
  
        return Promise.reject(error);
      });
    }
}

export default new BookingService()