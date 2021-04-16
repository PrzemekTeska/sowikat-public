package pl.teskarudz.olkrzycki.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.teskarudz.olkrzycki.model.Booking;
import pl.teskarudz.olkrzycki.service.BookingService;
import pl.teskarudz.olkrzycki.service.MailService;

import javax.mail.MessagingException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/admin")
public class AdminBookingController {

    private BookingService bookingService;
    private MailService mailService;


    @Autowired
    public AdminBookingController(BookingService bookingService, MailService mailService) {

        this.bookingService = bookingService;
        this.mailService = mailService;
    }

    @GetMapping("/bookings/search/{value}")
    public ResponseEntity<List<Booking>> getAllBookingsByValue(@PathVariable String value) {

        return new ResponseEntity<>(bookingService.findAllByLastNameOrClientEmailOrPhoneNumber(value), HttpStatus.OK);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {

        return new ResponseEntity<>(bookingService.findAllBookings(), HttpStatus.OK);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {

        Booking bookingCheck = bookingService.addBooking(booking);
        if (bookingCheck != null) {
            return new ResponseEntity<>(bookingCheck, HttpStatus.CREATED);
        } else return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

//    @GetMapping("/admin/bookings/{houseId}")
//    public ResponseEntity<List<Booking>> getAllBookingsByHouseId(@PathVariable int houseId) {
//
//        return new ResponseEntity<>(bookingService.findAllByHouseId(houseId), HttpStatus.OK);
//    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return new ResponseEntity<>(bookingService.findBookingById(id), HttpStatus.OK);
    }

    @PutMapping("/bookings")
    public ResponseEntity<Boolean> updateBooking(@RequestBody Booking booking) {
        boolean bookingCheck = bookingService.updateBooking(booking);
        if (bookingCheck) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);

    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Long> deleteBookingById(@PathVariable Long id) {
        bookingService.deleteBookingById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PatchMapping("/bookings/confirm/{id}")
    public ResponseEntity<Booking> confirmBooking(@PathVariable long id) throws MessagingException {
        Booking booking = bookingService.confirmBooking(id);
        if (booking == null) return ResponseEntity.noContent().build();
        String content = "<h3 style='text-align: center;'>Witaj " + booking.getFirstName() + "!</h3>" +
                "Z radością informujemy, że wybrany przez Ciebie termin został zaakceptowany. W celu potwierdzenia prosimy o kliknięcie poniższego przycisku." +
                "<br/><a href=\"https://api.sowikat.pl/api/v1/user/bookings/" + booking.getCode() + "\" target=\"_blank\" style=\"padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;background: #ED2939;\">\n" +
                "Potwierdź rezerwację\n" +
                "</a>" + "<br/><b><p>Powyższa wiadomość została wysłana automatycznie. Prosimy na nią nie odpowiadać.</p></b>";
        mailService.sendMail(booking.getClientEmail(), "Sowi Kąt - potwierdzenie rezerwacji", content, true);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/bookings/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable long id) throws MessagingException {
        Booking booking = bookingService.cancelBooking(id);
        if (booking == null) return ResponseEntity.noContent().build();
        String content = "<h3 style='text-align: center;'>Witaj " + booking.getFirstName() + "!</h3>" +
                "Z przykrością informujemy, że wybrany przez Ciebie termin został wcześniej zarezerwowany. Zachęcamy do ponownego odwiedzenia naszego serwisu " +
                "i skorzystania z oferty w innym terminie. Przepraszamy za niedogodność. " +
                "<br/><a href=\"https://sowikat.pl/rezerwacje\" target=\"_blank\" style=\"padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;background: #ED2939;\">\n" +
                "Wybierz inny termin\n" +
                "</a>" + "<br/><b><p>Powyższa wiadomość została wysłana automatycznie. Prosimy na nią nie odpowiadać.</p></b>";
        mailService.sendMail(booking.getClientEmail(), "Sowi Kąt - anulowanie rezerwacji", content, true);
        return ResponseEntity.ok().build();
    }
}
