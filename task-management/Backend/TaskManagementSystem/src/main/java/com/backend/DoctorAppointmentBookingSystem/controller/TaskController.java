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
import org.springframework.scheduling.config.Task;
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
    @GetMapping("/user-tasks")
public ResponseEntity<List<Tasks>>getTasksByUser(@RequestHeader ("Authorization")String authHeader) throws Exception {
        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
        List<Tasks> userTasks = taskService.getAllTaskByUser(user);
        return  new ResponseEntity<>(userTasks,HttpStatus.OK);
}



//    @GetMapping("/completed")
//    public ResponseEntity<List<Tasks>> getTasksByStatus(@RequestHeader("Authorization") String authHeader)throws  Exception{
//        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
//        List<Tasks> tasks = taskService.getTasksByStatus(TASK_STATUS.COMPLETE);
//        return new ResponseEntity<>(tasks,HttpStatus.OK);
//
//    }

    @PutMapping("/{id}")
    public  ResponseEntity <Tasks>UpdateTask(@PathVariable Long id,@RequestHeader("Authorization") String authHeader,@RequestBody TaskRequest request) throws Exception {
        Users user=userService.findUsernameByAuthorizationHeader(authHeader);
        Tasks updateTask= taskService.UpdateTask(id,request,authHeader);
        return  new ResponseEntity<>(updateTask,HttpStatus.OK);


    }

@PutMapping("/restore/{id}")
public ResponseEntity<Tasks> restoreTask(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {
    Users user = userService.findUsernameByAuthorizationHeader(authHeader);

    Tasks restoredTask = taskService.restoreTask(id);
    return new ResponseEntity<>(restoredTask, HttpStatus.OK);
}



    @PutMapping("/{taskId}/mark-completed")
    public ResponseEntity<Tasks> markTaskAsComplete(@PathVariable Long taskId, @RequestHeader("Authorization") String authHeader) throws Exception {

        Users user = userService.findUsernameByAuthorizationHeader(authHeader);

        Tasks updatedTask = taskService.markTaskAsComplete(taskId, user);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/completed")
    public List<Tasks> getCompletedTasksByUser(@RequestHeader("Authorization") String authHeader) throws Exception {
        Users user = userService.findUsernameByAuthorizationHeader(authHeader);
        return taskService.getCompletedTasksByUser(user);
    }









}
