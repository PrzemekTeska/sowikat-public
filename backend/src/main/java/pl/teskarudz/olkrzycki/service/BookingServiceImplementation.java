package pl.teskarudz.olkrzycki.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.teskarudz.olkrzycki.model.Booking;
import pl.teskarudz.olkrzycki.model.BookingForUser;
import pl.teskarudz.olkrzycki.repositories.BookingRepo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImplementation implements BookingService {

    private BookingRepo bookingRepo;

    @Autowired
    public BookingServiceImplementation(BookingRepo bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @Override
    public Booking addBooking(Booking booking) {
        for (Booking checkedBooking :
                bookingRepo.findAllByHouseId(booking.getHouseId())) {
            if (booking.getStartDate().getDayOfYear() == checkedBooking.getStartDate().getDayOfYear() ||
                    booking.getEndDate().getDayOfYear() == checkedBooking.getEndDate().getDayOfYear() ||
                    booking.getStartDate().getDayOfYear() == checkedBooking.getEndDate().getDayOfYear() ||
                    booking.getEndDate().getDayOfYear() == checkedBooking.getStartDate().getDayOfYear() ||
                    (booking.getStartDate().isAfter(checkedBooking.getStartDate()) && booking.getEndDate().isBefore(checkedBooking.getEndDate())) ||
                    (booking.getEndDate().isAfter(checkedBooking.getStartDate()) && booking.getEndDate().isBefore(checkedBooking.getEndDate())) ||
                    (booking.getStartDate().isBefore(checkedBooking.getStartDate()) && booking.getEndDate().isAfter(checkedBooking.getEndDate())) ||
                    (booking.getStartDate().isAfter(checkedBooking.getStartDate()) && booking.getStartDate().isBefore(checkedBooking.getEndDate()))
            ) {
                return null;
            }
        }
        if (booking.getHouseId() < 1 || booking.getHouseId() > 5 || booking.getClientEmail().equals("") ||
                booking.getFirstName().equals("") || booking.getLastName().equals("") ||
                booking.getPhoneNumber().equals("") || booking.getStatus().equals("") ||
                booking.getStartDate() == null || booking.getEndDate() == null || booking.getStartDate().isAfter(booking.getEndDate()))
            return null;
        bookingRepo.save(booking);
        return booking;
    }

    @Override
    public void deleteBookingById(long id) {
        bookingRepo.deleteById(id);
    }

    @Override
    public boolean updateBooking(Booking booking) {

        for (Booking checkedBooking :
                bookingRepo.findAllByHouseId(booking.getHouseId())) {
            if (booking.getId() != checkedBooking.getId()) {
                if (booking.getStartDate().getDayOfYear() == checkedBooking.getStartDate().getDayOfYear() ||
                        booking.getEndDate().getDayOfYear() == checkedBooking.getEndDate().getDayOfYear() ||
                        (booking.getStartDate().isAfter(checkedBooking.getStartDate()) && booking.getEndDate().isBefore(checkedBooking.getEndDate()))) {
                    return false;
                }
            }
        }
        if (booking.getHouseId() < 1 || booking.getHouseId() > 5 || booking.getClientEmail().equals("") ||
                booking.getFirstName().equals("") || booking.getLastName().equals("") ||
                booking.getPhoneNumber().equals("") || booking.getStatus().equals("") ||
                booking.getStartDate() == null || booking.getEndDate() == null || booking.getStartDate().isAfter(booking.getEndDate()))
            return false;
        Booking newBooking = bookingRepo.save(booking);
        return bookingRepo.findById(booking.getId()).get().equals(newBooking);

    }

    @Override
    public List<Booking> findAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public List<Booking> findAllBookingsCurrentYear() {
        List<Booking> bookingList = new ArrayList<>();
        for (Booking booking : bookingRepo.findAll()) {
            if (booking.getEndDate().getYear() >= LocalDateTime.now().getYear())
                bookingList.add(booking);
        }
        return bookingList;
    }

    @Override
    public List<Booking> findAllByLastNameOrClientEmailOrPhoneNumber(String value) {
        String regex = "^\\+(?:[0-9] ?){6,14}[0-9]$";

        if (value.contains("@")) return findAllByClientEmail(value);
        else if (value.matches(regex)) {
            return findAllByPhoneNumber(value);
        } else return findAllByLastName(value);
    }

    @Override
    public List<Booking> findAllByClientEmail(String clientEmail) {
        return bookingRepo.findAllByClientEmail(clientEmail);
    }

    @Override
    public List<Booking> findAllByLastName(String lastName) {
        return bookingRepo.findAllByLastName(lastName);
    }

    @Override
    public List<Booking> findAllByPhoneNumber(String phoneNumber) {
        return bookingRepo.findAllByPhoneNumber(phoneNumber);
    }

    @Override
    public List<Booking> findAllByHouseId(int houseId) {
        return bookingRepo.findAllByHouseId(houseId);
    }

    @Override
    public Booking findBookingById(long id) {
        Optional<Booking> booking = bookingRepo.findById(id);
        return booking.orElse(null);
    }

    @Override
    public List<BookingForUser> findAllBookingsForUser() {
        List<BookingForUser> bookingForUserList = new ArrayList<>();
        for (Booking booking :
                bookingRepo.findAll()) {
            if (!booking.getEndDate().isBefore(LocalDate.now())) {
                bookingForUserList.add(new BookingForUser(booking.getHouseId(), booking.getStartDate(), booking.getEndDate()));
            }
        }
        return bookingForUserList;
    }

    @Override
    public Booking confirmBooking(long id) {
        Booking bookingById = findBookingById(id);
        if (bookingById != null) {
            bookingById.setStatus("Rezerwacja zaakceptowana");
            bookingRepo.save(bookingById);
            return bookingById;
        }
        return null;
    }

    @Override
    public Booking cancelBooking(long id) {
        Booking bookingById = findBookingById(id);
        if (bookingById != null) {
            deleteBookingById(id);
            return bookingById;
        }
        return null;
    }

    @Override
    public Booking confirmBookingByUser(String code) {
        Booking bookingByCode = bookingRepo.findByCode(code);
        if (bookingByCode != null) {
            bookingByCode.setStatus("Rezerwacja potwierdzona");
            bookingRepo.save(bookingByCode);
            return bookingByCode;
        }
        return null;
    }
}
