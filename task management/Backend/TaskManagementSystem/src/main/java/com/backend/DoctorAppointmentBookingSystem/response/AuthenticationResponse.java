package com.backend.DoctorAppointmentBookingSystem.response;

import com.backend.DoctorAppointmentBookingSystem.model.USER_ROLE;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;
    private String firstName;
    private String role;
}
