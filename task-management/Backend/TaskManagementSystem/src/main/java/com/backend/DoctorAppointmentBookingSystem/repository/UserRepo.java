package com.backend.DoctorAppointmentBookingSystem.repository;

import com.backend.DoctorAppointmentBookingSystem.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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


    @Query("SELECT u FROM Users u WHERE u.isDeleted = false")
    List<Users> findAllActiveUsers();


    @Modifying
    @Query("UPDATE Users u SET u.isDeleted = true WHERE u.id = :id")
    void softDeleteUser(@Param("id") Long id);

    @Query("SELECT u FROM Users u WHERE u.isDeleted = true")
    List<Users> findDeletedUsers();

    @Modifying
    @Query("UPDATE Users u Set u.isDeleted =false WHERE u.id = :id")
    void  restoreUser(@Param("id") Long id);


}
