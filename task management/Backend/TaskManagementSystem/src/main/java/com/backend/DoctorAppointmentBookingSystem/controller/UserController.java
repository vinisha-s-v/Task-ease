package com.backend.DoctorAppointmentBookingSystem.controller;

import com.backend.DoctorAppointmentBookingSystem.request.AuthenticationRequest;
import com.backend.DoctorAppointmentBookingSystem.request.PasswordRequest;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.response.AuthenticationResponse;
import com.backend.DoctorAppointmentBookingSystem.service.UserService;
import com.backend.DoctorAppointmentBookingSystem.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5176")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserServiceImp userServiceImp;

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody RegisterRequest request){
        System.out.println(request +"cccccc");
        Users user = service.register(request);

        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request) throws Exception {
        AuthenticationResponse authenticationResponse = service.authenticate(request);

        return  new ResponseEntity<>(authenticationResponse,HttpStatus.OK);

    }
    @GetMapping("/admin")
    public  ResponseEntity<String> adminpage(){
        return  ResponseEntity.ok("Welecome Admin");
    }

  @GetMapping("/active")
  public List<Users>getActiveUsers(){
       return  service.getAllActiveUsers();
  }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordRequest passwordRequest) {
        try {
          //  service.resetPassword(passwordRequest.getPassword());
            return ResponseEntity.ok("Password successfully reset.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error resetting password.");
        }
    }


}
