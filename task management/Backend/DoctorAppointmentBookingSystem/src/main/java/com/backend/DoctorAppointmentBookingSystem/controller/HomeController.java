package com.backend.DoctorAppointmentBookingSystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
public class HomeController {

    @GetMapping("/api/admin")
    public String getHomePage(){
        return "Welcome Admin page";
    }
    @GetMapping("/api/user")
    public String getUserHomePage(){
        return "Welcome User page";
    }



}
