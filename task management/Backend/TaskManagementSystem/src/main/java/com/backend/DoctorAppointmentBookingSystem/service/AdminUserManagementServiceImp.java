package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.UserRepo;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminUserManagementServiceImp implements  AdminUserManagementService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Users> getAllUsers() {

        return userRepo.findAll();
    }

    //ADD USER METHOD
    @Override
    public Users addUsers(RegisterRequest request) {

        Users newUser = new Users(); //create a new user from the request
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser. setEmail(request.getPassword());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole());

        return  userRepo.save(newUser); //save new user to database-repo
    }

    //UPDATE USER METHOD

    @Override
    public Users updateUsers(Long id, RegisterRequest request, Users users) {
        Optional<Users> existingUser = userRepo.findById(id);//find the usesr by id  from the database

        if (existingUser.isPresent()) {
            Users updateUser = existingUser.get(); // update the  exisiting user with new data
            updateUser.setFirstName(request.getFirstName());
            updateUser.setLastName((request.getLastName()));
            updateUser.setEmail(request.getEmail());
            updateUser.setPassword(passwordEncoder.encode(request.getPassword()));
            updateUser.setRole(request.getRole());

            return userRepo.save(updateUser); //save to database
        }
        else {
            throw new  RuntimeException("User not found with id"+id);
        }
    }

    //DELETE USER METHOD

    @Override
    public Users deleteUsers(Long id) {
        Optional<Users> deletedUser =userRepo.findById(id); //find the user from repo

        if(deletedUser.isPresent()){
            userRepo.deleteById(id); //delete the user from the repo-database
            return deletedUser.get();

        }
        else {
            throw  new RuntimeException("User not found with id:"+id);
        }

    }

    // serach method for users
    public List<Users> searchUsers(String keyword){
        return  userRepo.searchUsers(keyword);
    }


}
