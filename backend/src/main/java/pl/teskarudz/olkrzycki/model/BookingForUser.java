package pl.teskarudz.olkrzycki.model;

import java.time.LocalDate;

public class BookingForUser {

    int houseId;
    LocalDate startDate;
    LocalDate endDate;

    public BookingForUser(int houseId, LocalDate startDate, LocalDate endDate) {
        this.houseId = houseId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public int getHouseId() {
        return houseId;
    }

    public void setHouseId(int houseId) {
        this.houseId = houseId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
