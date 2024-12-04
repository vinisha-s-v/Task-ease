package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.request.TaskRequest;

import java.util.Date;
import java.util.List;

public interface TaskService {


    Tasks createTask(TaskRequest tasks, Users user) throws Exception;

     List<Tasks> getAllTask();

     void deleteTask(Long id);

     Tasks UpdateTask(Long id, TaskRequest request) throws  Exception;


     List<Tasks>getTasksByStatus(TASK_STATUS status);

//    Tasks scheduledTask(Long id, Date scheduleTime) throws Exception;
}
