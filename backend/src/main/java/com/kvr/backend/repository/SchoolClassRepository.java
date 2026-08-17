package com.kvr.backend.repository;

import com.kvr.backend.entity.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolClassRepository
        extends JpaRepository<SchoolClass, Long> {

    List<SchoolClass> findByStatus(
            SchoolClass.ClassStatus status
    );

    List<SchoolClass> findByAcademicYear(
            String academicYear
    );

    List<SchoolClass> findByClassNameContainingIgnoreCase(
            String className
    );
}