package pl.teskarudz.olkrzycki.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.teskarudz.olkrzycki.model.Booking;
import pl.teskarudz.olkrzycki.model.BookingForUser;
import pl.teskarudz.olkrzycki.service.BookingService;
import pl.teskarudz.olkrzycki.service.MailService;

import javax.mail.MessagingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController {

    private BookingService bookingService;
    private MailService mailService;

    @Autowired
    public MainController(BookingService bookingService, MailService mailService) {
        this.bookingService = bookingService;
        this.mailService = mailService;
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingForUser>> getBookingsForUser() {
        return new ResponseEntity<>(bookingService.findAllBookingsForUser(), HttpStatus.OK);
    }

    @GetMapping("/bookings/{code}")
    public ResponseEntity<Object> confirmBookingByUser(@PathVariable String code) throws URISyntaxException {
        Booking booking = bookingService.confirmBookingByUser(code);
        if (booking != null) {
            URI uri = new URI("https://sowikat.pl/rezerwacje/potwierdzenie");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(uri);
            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) throws MessagingException {
        booking.setStatus("Rezerwacja wstępna");
        String code = UUID.randomUUID().toString();
        booking.setCode(code);
        Booking bookingCheck = bookingService.addBooking(booking);
        if (bookingCheck != null) {
            sendMailAfterBooking(booking);
            return new ResponseEntity<>(bookingCheck, HttpStatus.CREATED);

        } else return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    private void sendMailAfterBooking(Booking booking) throws MessagingException {
        String emailContent;
        emailContent = "<h3 style='text-align: center;'>Witaj " + booking.getFirstName() + "!</h3>" +
                "Informujemy, że otrzymaliśmy Twoją prośbę o rezerwację domku nr <b>" + booking.getHouseId() + "</b> w terminie: <b>" + booking.getStartDate() + " - " +
                booking.getEndDate() + "</b><br/>" + "<b style=\"color: #FF0000\">UWAGA: Rezerwacja nie została jeszcze potwierdzona. Potwierdzenie lub ewentualne anulowanie wkrótce otrzymasz drogą mailową.</b>"
                + "<br/><b><p>Powyższa wiadomość została wysłana automatycznie. Prosimy na nią nie odpowiadać.</p></b>";
        mailService.sendMail(booking.getClientEmail(),
                "Sowi Kąt - wstępna rezerwacja",
                emailContent,
                true
        );

    }


    @PostMapping("/bookings/mail")
    public void sendMailToAdmin(@RequestBody Booking booking) throws MessagingException {
        String emailToAdminContent;
        emailToAdminContent = "Nowa wstępna rezerwacja w systemie na adres e-mail <b>" + booking.getClientEmail() + "</b><br/>Sprawdź czy na <a href=\"https://www.booking.com\">booking.com<a> nie zajęto tego terminu. Wejdź do panelu admina i potwierdź lub anuluj rezerwację." +
                "<br/>Numer domku: <b>" + booking.getHouseId() + "</b><br/>Data rozpoczęcia rezerwacji: <b>" + booking.getStartDate() + "</b><br/>Data zakończenia rezerwacji: <b>" + booking.getEndDate() +
                "</b><br/><a href=\"https://sowikat.pl/admin/bookings\" target=\"_blank\" style=\"padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;background: #ED2939;\">\n" +
                "                          Panel admina             \n" +
                "                      </a>";
        String adminEmail = "kontakt@sowikat.pl";
        mailService.sendMail(adminEmail,
                "Nowa rezerwacja - Sowi Kąt",
                emailToAdminContent,
                true);
    }

}