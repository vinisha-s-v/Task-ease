package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.request.TaskRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface TaskService {


    Tasks createTask(TaskRequest tasks, Users user) throws Exception;

     List<Tasks> getAllTask();

     void deleteTask(Long id);

     Tasks UpdateTask(Long id, TaskRequest request, String authHeader) throws  Exception;


     List<Tasks>getTasksByStatus(TASK_STATUS status);

   

    String softDeleteTask(Long id);

    Tasks restoreTask(Long id) throws Exception;

    List<Tasks> getAllTaskByUser(Users user);

    List<Tasks> getAllActiveTasks(Users user);

    List<Tasks> getCompletedTasksByUser(Users users);

    Tasks markTaskAsComplete(Long id, Users user);
    // List<Tasks> getCompletedTasks(Users user);

//    Tasks scheduledTask(Long id, Date scheduleTime) throws Exception;
}
