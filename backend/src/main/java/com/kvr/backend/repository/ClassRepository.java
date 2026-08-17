package com.kvr.backend.repository;

import com.kvr.backend.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {

    List<Class> findByAcademicYear(String academicYear);

    List<Class> findByStatus(Class.ClassStatus status);

    List<Class> findByAcademicYearAndStatus(
            String academicYear,
            Class.ClassStatus status
    );

    List<Class> findByClassNameContainingIgnoreCase(
            String className
    );
}