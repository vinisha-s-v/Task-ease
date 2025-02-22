package com.backend.DoctorAppointmentBookingSystem.model;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Bean;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder

public class Users {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    @Setter
    @Getter
    private String password;

    @Enumerated(EnumType.STRING) //This tells JPA to store the value of the role field as a string in the database.
    private USER_ROLE role;


    @Column( nullable = false)
    private  boolean isDeleted =false; //soft delete flag


}
