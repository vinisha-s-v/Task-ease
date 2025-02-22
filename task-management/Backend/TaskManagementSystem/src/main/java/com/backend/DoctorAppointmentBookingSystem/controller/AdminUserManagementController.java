package com.backend.DoctorAppointmentBookingSystem.controller;

import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.UserRepo;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;
import com.backend.DoctorAppointmentBookingSystem.service.AdminUserManagementService;
import com.backend.DoctorAppointmentBookingSystem.service.AdminUserManagementServiceImp;
import com.backend.DoctorAppointmentBookingSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminUserManagementController {
    @Autowired
     private  UserRepo userRepo;

//    @Autowired
//    private UserService service;

    @Autowired
    private AdminUserManagementService adminUserManagementService;

    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers(@RequestHeader ("Authorization") String authHeader) throws  Exception{ //only access admin by extract admin token

        Users user = userService.findUsernameByAuthorizationHeader(authHeader);//Extracts the user info from the Authorization header

        List<Users> users= adminUserManagementService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
@PostMapping("/users")
    public  ResponseEntity<Users> addUsers(@RequestBody RegisterRequest request, @RequestHeader ("Authorization")String authHeader) throws Exception{

      Users users =userService.findUsernameByAuthorizationHeader(authHeader);
      Users user = adminUserManagementService.addUsers(request);
  return  new ResponseEntity<>(user,HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Users> updateUsers(@PathVariable Long id,@RequestBody RegisterRequest request,@RequestHeader ("Authorization") String authHeader) throws Exception {
         Users users= userService.findUsernameByAuthorizationHeader(authHeader);
         Users user =adminUserManagementService.updateUsers(id,request,users);
         return  new ResponseEntity<>(user,HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public  ResponseEntity<Void>deleteUsers(@PathVariable Long id,@RequestHeader("Authorization") String authHeader) throws Exception {
        Users users=userService.findUsernameByAuthorizationHeader(authHeader);
        Users user=adminUserManagementService.deleteUsers(id);
       return  new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/users/deleted")
    public  ResponseEntity<List<Users>> getDeletedUsers(@RequestHeader("Authorization") String authHeader) throws Exception{
        Users users =userService.findUsernameByAuthorizationHeader(authHeader);

               List<Users> deletedUsers = userRepo.findDeletedUsers();
    return  new ResponseEntity<>(deletedUsers,HttpStatus.OK);
    }

    @PutMapping("/users/restore/{id}")
    public ResponseEntity<Users> restoreUsers(@PathVariable Long id,@RequestHeader("Authorization") String authHeader) throws  Exception{
        Users users= userService.findUsernameByAuthorizationHeader(authHeader);
        Users restoreUser=adminUserManagementService.restoreUser(id);
        return   new ResponseEntity<>(restoreUser,HttpStatus.OK);
    }

    // Endpoint to search users
        @GetMapping("/users/search")
    public List<Users> searchUsers(@RequestParam("keyword") String keyword) { 
        return adminUserManagementService.searchUsers(keyword);
    }

//


}
 