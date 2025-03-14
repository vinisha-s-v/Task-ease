package com.backend.DoctorAppointmentBookingSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private  String title;

    private  String description;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private  TASK_STATUS status = TASK_STATUS.ACTIVE;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users assignedUserId;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

//    @Column(nullable = false)
//    private  boolean is_Deleted = false;


//    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private  LocalDateTime scheduleTime;


//    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private   LocalDateTime deadLine;

    public void setDeleted(boolean isDeleted) {
        this.isDeleted=isDeleted;
    }

    @Column(nullable = false)
    private boolean completed; // Ensure this field exists and is named correctly
}
