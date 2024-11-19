package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.USER_ROLE;
import com.backend.DoctorAppointmentBookingSystem.model.UserPrinciple;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> usersOptional=userRepo.findByEmail(username);
      if(usersOptional.isEmpty()){
          throw new UsernameNotFoundException("User Not Found");
      }
      Users user =usersOptional.get();

        USER_ROLE role = user.getRole();
        if(role==null){
            user.setRole(USER_ROLE.USER);
        }

      return new UserPrinciple(user);
    }
}
