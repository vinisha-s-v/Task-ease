package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.request.RegisterRequest;

import java.util.List;

public interface AdminUserManagementService  {

    List<Users> getAllUsers();

    Users addUsers(RegisterRequest request);

    Users updateUsers(Long id, RegisterRequest request, Users users);

    Users deleteUsers(Long id);

    List<Users> searchUsers(String keyword);

    void softDeleteUser(Long id) throws Exception;

    Users restoreUser(Long id) throws  Exception;
}
