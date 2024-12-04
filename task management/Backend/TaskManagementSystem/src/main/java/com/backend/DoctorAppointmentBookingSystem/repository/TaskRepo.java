package com.backend.DoctorAppointmentBookingSystem.repository;

import com.backend.DoctorAppointmentBookingSystem.model.TASK_STATUS;
import com.backend.DoctorAppointmentBookingSystem.model.Tasks;
import com.backend.DoctorAppointmentBookingSystem.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<Tasks,Long> {


    Optional<Users> findByTitle(String username);

    List<Tasks>findByStatus(TASK_STATUS status);

//    @Query("SELECT t FROM Tasks t WHERE " +
//            "(:title IS NULL OR t.title LIKE %:title%) AND " +
//            "(:status IS NULL OR t.status = :status) AND " +
//            "(:assignedUserId IS NULL OR t.assignedUserId.id = :assignedUserId) AND " +
//            "(:startTime IS NULL OR t.scheduleTime >= :startTime) AND " +
//            "(:endTime IS NULL OR t.scheduleTime <= :endTime)")
//    List<Tasks> searchTasks(
//            @Param("title") String title,
//            @Param("status") TASK_STATUS status,
//            @Param("assignedUserId") Long assignedUserId,
//            @Param("startTime") LocalDateTime startTime,
//            @Param("endTime") LocalDateTime endTime
//    );
}
