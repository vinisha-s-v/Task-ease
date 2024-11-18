package com.backend.DoctorAppointmentBookingSystem.repository;

import com.backend.DoctorAppointmentBookingSystem.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<Users,Long> {
    Optional<Users> findByEmail(String username);



    @Query("SELECT u FROM Users u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Users> searchUsers(@Param("keyword") String keyword);

}
