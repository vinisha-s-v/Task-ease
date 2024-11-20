package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.request.AuthenticationRequest;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.response.AuthenticationResponse;


public interface UserService {
    public Users register(RegisterRequest request);

     public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception;

     public Users findUsernameByAuthorizationHeader(String authHeader) throws  Exception;
}