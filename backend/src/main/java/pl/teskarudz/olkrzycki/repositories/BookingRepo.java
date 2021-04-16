package pl.teskarudz.olkrzycki.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.teskarudz.olkrzycki.model.Booking;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {

    List<Booking> findAllByClientEmail(String clientEmail);

    List<Booking> findAllByLastName(String lastName);

    List<Booking> findAllByPhoneNumber(String phoneNumber);

    List<Booking> findAllByHouseId(int houseId);

    Booking findByCode(String code);

    Booking findBookingByStartDateAndEndDateAndStatus(LocalDateTime startDate, LocalDateTime endDate, String status);
}
