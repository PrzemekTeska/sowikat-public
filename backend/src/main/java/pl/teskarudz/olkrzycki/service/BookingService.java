package pl.teskarudz.olkrzycki.service;

import pl.teskarudz.olkrzycki.model.Booking;
import pl.teskarudz.olkrzycki.model.BookingForUser;

import java.util.List;

public interface BookingService {

    Booking addBooking(Booking booking);

    void deleteBookingById(long id);

    boolean updateBooking(Booking booking);

    List<Booking> findAllBookings();

    List<Booking> findAllBookingsCurrentYear();

    List<Booking> findAllByLastNameOrClientEmailOrPhoneNumber(String value);

    List<Booking> findAllByClientEmail(String clientEmail);

    List<Booking> findAllByLastName(String lastName);

    List<Booking> findAllByPhoneNumber(String phoneNumber);

    List<Booking> findAllByHouseId(int houseId);

    Booking findBookingById(long id);

    List<BookingForUser> findAllBookingsForUser();

    Booking confirmBooking(long id);

    Booking cancelBooking(long id);

    Booking confirmBookingByUser(String code);
}
