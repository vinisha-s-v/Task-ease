package com.backend.DoctorAppointmentBookingSystem.repository;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<Tasks,Long> {


    Optional<Tasks> findByTitle(String title);


    List<Tasks>findByStatus(TASK_STATUS status);

    @Query("SELECT t FROM Tasks t WHERE t.isDeleted = false")
    List<Tasks>findAllActiveTasks();

    List<Tasks> findByIsDeletedFalse();


    List<Tasks> findByAssignedUserId(Users user);


//    @Query("SELECT t FROM Tasks t WHERE t.status = :status AND t.user = :user")
//    List<Tasks> findTasksByStatusAndUser(@Param("status") TASK_STATUS status, @Param("user") Users user);
@Query("SELECT t FROM Tasks t WHERE t.status = :status AND t.assignedUserId = :user")
List<Tasks> findByStatusAndAssignedUserId(@Param("status") TASK_STATUS status, @Param("user") Users user);

    @Modifying
    @Query("UPDATE Tasks t SET t.status = 'completed' WHERE t.id = :taskId")
    void markTaskAsCompleted(Long taskId);
}
