package com.backend.DoctorAppointmentBookingSystem.request;


import com.backend.DoctorAppointmentBookingSystem.model.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest  {



    private String firstName;

    private  String lastName;
    private  String email;
    private  String password;
    private USER_ROLE role;
}
