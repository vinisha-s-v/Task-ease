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
    public Tasks UpdateTask(Long id, TaskRequest request) throws Exception {
//        Optional<Tasks> existingTask = taskRepo.findById(id);
//
//        if (existingTask.isPresent()) {
//            Tasks task = existingTask.get();
//
//            // Update fields only if they are provided in the request
//            if (request.getTitle() != null) {
//                task.setTitle(request.getTitle());
//            }
//            if (request.getDescription() != null) {
//                task.setDescription(request.getDescription());
//            }
//
//            // Save the updated task and return it
//            return taskRepo.save(task);
//        } else {
//            // Handle case where task does not exist (optional)
//            throw new Exception("Task not found with ID: " + id);
//        }


        Tasks task=findTaskById(id);
        if (request.getTitle()!=null){
            task.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        return taskRepo.save(task);

    }
//
//    @Override
//    public Tasks scheduledTask(Long id, Date scheduleTime) throws Exception {
//        if (scheduleTime == null || scheduleTime.before(new Date())) {
//            throw new IllegalArgumentException("Schedule time must be in the future.");
//        }
//       Tasks tasks =taskRepo.findById(id).orElseThrow(()->new Exception("Task not found"));
//       tasks.setScheduleTime(scheduleTime);
//       return  taskRepo.save(tasks);
//    }


    public Tasks findTaskById (Long id){
            Optional<Tasks> tasks = taskRepo.findById(id);

            if(tasks.isEmpty()){
                throw  new RuntimeException("task not found");

            }
            return tasks.get();

        }
    }


//    @Override
//    public ApiResponse getTaskById(Long id) {
//        Optional<Tasks> tasks = taskRepo.findById(id.longValue());
//        if (tasks.isPresent()) {
//            return new ApiResponse("Task found", tasks.get());
//        } else {
//            return new ApiResponse("Task not found with ID" + id, null);
//        }
//
//    }
//
//    @Override
//    public ApiResponse getAllTask() {
//        List<Tasks> tasks = taskRepo.findAll();
//        return new ApiResponse("Tasks get sucessfully", tasks);
//    }
//
//    @Override
//    public ApiResponse updateTask(Long id, Tasks tasks) {
//        Optional<Tasks> existingTask = taskRepo.findById(id);
//
//        if (existingTask.isPresent()) {
//            Tasks updateTask = existingTask.get();
//
//            updateTask.setTitle(tasks.getTitle());
//            updateTask.setTaskStatus(tasks.getTaskStatus());
//            updateTask.setDescription(tasks.getDescription());
//            updateTask.setDeadLine(tasks.getDeadLine());
//            updateTask.setImage(tasks.getImage());
//            updateTask.setAssignedUserId(tasks.getAssignedUserId());
//            Tasks savedTasks = taskRepo.save(tasks);
//        }
//
//        return new ApiResponse();
//    }
//
//    @Override
//    public void deleteTask(Long id) {
//        if (taskRepo.existsById(id)) {
//            taskRepo.deleteById(id);
//
//
//        } else {
//            throw new RuntimeException("Task Not Found with ID:" + id);
//        }
//
//
//    }
//
//    @Override
//    public Tasks inProgress(Long id) {
//        Optional<Tasks> exisistingTask = taskRepo.findById(id);
//
//        if(exisistingTask.isPresent()){
//            Tasks tasks=exisistingTask.get();
//            tasks.setTaskStatus(TASK_STATUS.IN_PROGRESS);
//
//            return  taskRepo.save(tasks);
//
//        }
//        else {
//            throw new RuntimeException("Tasks Not Found With ID :"+id);
//        }
//    }
//
//
//    @Override
//    public Tasks doneTask(Long id) {
//        Optional<Tasks> exisistingTask = taskRepo.findById(id);
//        if (exisistingTask.isPresent()) {
//            Tasks tasks = exisistingTask.get();
//            tasks.setTaskStatus(TASK_STATUS.COMPLETED);
//
//            return taskRepo.save(tasks);
//        } else {
//            throw new RuntimeException("Tasks Not Found With ID :" + id);
//
//        }
//    }
//
//    @Override
//    public Tasks PendingTask(Long id) {
//        Optional<Tasks> existingTask = taskRepo.findById(id);
//        if (existingTask.isPresent()) {
//            Tasks tasks = existingTask.get();
//            tasks.setTaskStatus(TASK_STATUS.PENDING);
//
//            return taskRepo.save(tasks);
//        } else {
//            throw new RuntimeException("Task Not Found With ID :" + id);
//        }
//
//    }
//
//    @Override
//    public Users findUsernameByAuthorizationHeader(String authHeader) throws Exception {
//        try {
//            String username= jwtService.extractUserName(authHeader.substring(7));
//
//            if(username!=null){
//                Optional<Users> usersOptional = taskRepo.findByTitle(username);
//                if (usersOptional.isEmpty()){
//                    throw  new UsernameNotFoundException("User not Found");
//                }
//                Users user;
//                user=usersOptional.get();
//                return  user;
//            }else {
//                throw  new RuntimeException("username not found");
//            }
//        }catch (Exception e){
//            throw  new RuntimeException("Failed to find user by JWT Token");
//        }
//
//    }
