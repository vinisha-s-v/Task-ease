package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.USER_ROLE;
import com.backend.DoctorAppointmentBookingSystem.model.UserPrinciple;
import com.backend.DoctorAppointmentBookingSystem.request.AuthenticationRequest;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.UserRepo;
import com.backend.DoctorAppointmentBookingSystem.response.AuthenticationResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo repo;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Override
    public Users register(RegisterRequest request) {

        Optional<Users> existingUser = repo.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email is already used with another account");
        }
        try {
//            String role=request.getRole()!=null ? request.getRole().toString() : "USER";

            Users user = new Users();
            user.setEmail(request.getEmail());
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPassword(request.getPassword());
            user.setRole(request.getRole());
            user.setPassword(passwordEncoder.encode(request.getPassword()));


            System.out.println(request.getRole());


            repo.save(user);
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Registration failed" + e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception{

        try {
//            UserDetails userDetails = myUserDetailsService.loadUserByUsername(request.getEmail());
//            if (userDetails == null) {
//                throw new RuntimeException("Invalid password");
//
//
//            }
//            if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
//                throw new RuntimeException("Invalid Password");
//            }

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
            System.out.println(request+"yooooooo");
            if (authentication.isAuthenticated()) {
               var userPrinciple= (UserPrinciple) authentication.getPrincipal();
                String jwtToken=jwtService.generateToken(authentication);
                return AuthenticationResponse.builder()

                        .token(jwtToken)
                        .firstName(userPrinciple.getUsers().getFirstName())
                        .role(String.valueOf((userPrinciple.getUsers().getRole())))

                        .build();
            } else {
                throw new RuntimeException("Authentication failed");
            }

        } catch (Exception e) {
            throw new Exception("Invalid");
        }


    }

    @Override
    public Users findUsernameByAuthorizationHeader(String authHeader) throws Exception {
      try {
          String username= jwtService.extractUserName(authHeader.substring(7));

          if(username!=null){
              Optional<Users> usersOptional = repo.findByEmail(username);
              if (usersOptional.isEmpty()){
                  throw  new UsernameNotFoundException("User not Found");
              }
              Users user ;
              user = usersOptional.get();
              return user;
          }else {
              throw  new RuntimeException("username not found");
          }
      }catch (Exception e){
          throw  new RuntimeException("Failed to find user by JWT Token");
      }

    }
}