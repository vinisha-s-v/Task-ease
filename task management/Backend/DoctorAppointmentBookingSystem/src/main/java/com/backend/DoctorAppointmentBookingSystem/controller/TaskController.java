package com.backend.DoctorAppointmentBookingSystem.controller;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import com.backend.DoctorAppointmentBookingSystem.repository.TaskRepo;
import com.backend.DoctorAppointmentBookingSystem.request.TaskRequest;
import com.backend.DoctorAppointmentBookingSystem.service.TaskService;
import com.backend.DoctorAppointmentBookingSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/users/tasks")
public class TaskController {



    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskRepo taskRepo;



    @PostMapping("/create")
    public ResponseEntity<Tasks> createTask(@RequestBody TaskRequest task,@RequestHeader("Authorization") String authHeader) throws Exception {


//
        System.out.println(task);

        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
        Tasks response = taskService.createTask(task, user);

        return ResponseEntity.ok(response);
    }
    @GetMapping()
    public ResponseEntity<List<Tasks>> getAllTask (@RequestHeader("Authorization") String authHeader) throws Exception {
        Users user= userService.findUsernameByAuthorizationHeader(authHeader);
        List<Tasks> response =taskService.getAllTask();
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteTask( @PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {
        Users user =userService.findUsernameByAuthorizationHeader(authHeader);

          taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public  ResponseEntity <Tasks>UpdateTask(@PathVariable Long id,@RequestHeader("Authorization") String authHeader,@RequestBody TaskRequest request) throws Exception {
        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
        Tasks updateTask= taskService.UpdateTask(id,request);
         return  new ResponseEntity<>(updateTask,HttpStatus.OK); 


    }
//    @PostMapping("/schedule/{id}")
//    public  ResponseEntity<Tasks> scheduleTask(@PathVariable Long id,
//                                               @RequestParam Date scheduleTime,
//                                               @RequestHeader("Authorization") String authHeader) throws Exception{
//
//        System.out.println(scheduleTime);
//        Users user = userService.findUsernameByAuthorizationHeader(authHeader);
//
//        Tasks scheduledTask =taskService.scheduledTask(id,scheduleTime);
//        return ResponseEntity.ok(scheduledTask);
//    }

//    @GetMapping("/search")
//    public List<Tasks> searchTasks(
//            @RequestParam(required = false) String title,
//            @RequestParam(required = false) TASK_STATUS status,
//            @RequestParam(required = false) Long assignedUserId,
//            @RequestParam(required = false) LocalDateTime startTime,
//            @RequestParam(required = false) LocalDateTime endTime
//    ) {
//        return taskRepo.searchTasks(title, status, assignedUserId, startTime, endTime);
//    }


}
