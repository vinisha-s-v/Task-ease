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
        List<Tasks> response =taskService.getAllActiveTasks(user);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteTask( @PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {
        Users users =userService.findUsernameByAuthorizationHeader(authHeader);
//Tasks tasks=taskService.deleteTask(id);
//return new ResponseEntity<>(HttpStatus.OK);
          taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.OK);

    }




    @GetMapping("/{status}")
    public ResponseEntity<List<Tasks>> getTasksByStatus(@PathVariable TASK_STATUS status,@RequestHeader("Authorization") String authHeader)throws  Exception{
        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
        List<Tasks> tasks = taskService.getTasksByStatus(status);
        return new ResponseEntity<>(tasks,HttpStatus.OK);

    }



@PutMapping("/restore/{id}")
public ResponseEntity<Tasks> restoreTask(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {
    Users user = userService.findUsernameByAuthorizationHeader(authHeader);

    Tasks restoredTask = taskService.restoreTask(id);
    return new ResponseEntity<>(restoredTask, HttpStatus.OK);
}



    @PutMapping("/complete/{id}")
    public ResponseEntity<Void> markTaskAsComplete(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {

        Users user = userService.findUsernameByAuthorizationHeader(authHeader);

        taskService.markTaskAsComplete(id, user);
        return ResponseEntity.ok().build();
    }







}
