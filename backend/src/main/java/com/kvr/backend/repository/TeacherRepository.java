package com.kvr.backend.repository;

import com.kvr.backend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository
        extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByEmployeeId(String employeeId);

    boolean existsByEmployeeId(String employeeId);

    List<Teacher> findByStatus(String status);

    List<Teacher> findByFullNameContainingIgnoreCase(String name);

    List<Teacher> findByClassId(Long classId);
}