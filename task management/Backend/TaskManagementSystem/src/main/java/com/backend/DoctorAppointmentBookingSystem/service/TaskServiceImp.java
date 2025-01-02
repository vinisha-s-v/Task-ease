package com.backend.DoctorAppointmentBookingSystem.service;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.TaskRepo;
import com.backend.DoctorAppointmentBookingSystem.request.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImp implements  TaskService {


    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserService userservice;

    @Autowired
    private JwtService jwtService;




    @Override
    public Tasks createTask(TaskRequest tasks, Users user) throws Exception {

        System.out.println(tasks.getScheduleTime()+"get schedule task");
        System.out.println(tasks.getDeadLine()+"get deadLine");

        Tasks task = new Tasks();
        task.setTitle(tasks.getTitle());
        task.setDescription(tasks.getDescription());
        task.setScheduleTime(tasks.getScheduleTime());
        task.setDeadLine(tasks.getDeadLine());
        task.setCreatedAt(LocalDateTime.now());
        task.setAssignedUserId(user);
        task.setStatus(TASK_STATUS.PENDING);








        taskRepo.save(task);
        return task;


    }

    @Override
    public List<Tasks> getAllTask() {
        return taskRepo.findAll();


    }

    @Override
    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
//          deleteTask(id);
    }



    @Override
    public Tasks UpdateTask(Long id, TaskRequest request, String authHeader) throws Exception {
        // Use the authHeader if required
        Users user = userservice.findUsernameByAuthorizationHeader(authHeader);

        // Fetch the task by id
        Tasks task = taskRepo.findById(id)
                .orElseThrow(() -> new Exception("Task not found"));

        // Update the task fields
        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getScheduleTime() != null) {
            task.setScheduleTime(request.getScheduleTime());
        }
        if (request.getDeadLine() != null) {
            task.setDeadLine(request.getDeadLine());
        }
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }

        // Save the updated task
        return taskRepo.save(task);
    }


    @Override
    public List<Tasks> getTasksByStatus(TASK_STATUS status) {
        return taskRepo.findByStatus(status);
    }



    public List<Tasks> getAllActiveTasks(Users user) {
       return  taskRepo.findByIsDeletedFalse();
    }


    @Override
    public List<Tasks>   getAllTaskByUser(Users user) {
        return  taskRepo.findByAssignedUserId(user);
    }



    public Tasks findTaskById (Long id){
            Optional<Tasks> tasks = taskRepo.findById(id);

            if(tasks.isEmpty()){
                throw  new RuntimeException("task not found");

            }
            return tasks.get();

        }



public Tasks restoreTask(Long taskId) throws Exception {
    Optional<Tasks> optionalTask = taskRepo.findById(taskId);

    if (optionalTask.isPresent()) {
        Tasks task = optionalTask.get();

        // Check if the task is already restored or doesn't need restoring
        if (task.getStatus() != TASK_STATUS.DELETED) {
            throw new Exception("Task is not deleted, no need to restore");
        }

        // Change the status of the task to ACTIVE
        task.setStatus(TASK_STATUS.ACTIVE);

        // Save the task
        return taskRepo.save(task);
    } else {
        throw new Exception("Task not found");
    }
}



    public String softDeleteTask(Long id){
        Optional<Tasks>tasksOptional =taskRepo.findById(id);
        if(tasksOptional.isPresent()){
            Tasks tasks = tasksOptional.get();
            tasks.setDeleted(true);
            taskRepo.save(tasks);
            return  ("Task soft-deleted sucessfuly");


        }
        else {
            return ("Task not found");
        }
        }


//    @Override
//    public List<Tasks> getCompletedTasks(Users user) {
//        return taskRepo.findByStatusAndAssignedUserId(TASK_STATUS.COMPLETE, user);
//    }
@Override
public void markTaskAsComplete(Long taskId,Users user) {
    Optional<Tasks> taskOptional = taskRepo.findById(taskId);
    if (taskOptional.isPresent()) {
        Tasks task = taskOptional.get();
        task.setStatus(TASK_STATUS.COMPLETE);
        taskRepo.save(task);
    } else {
        throw new RuntimeException("Task not found with ID: " + taskId);
    }
}



}







