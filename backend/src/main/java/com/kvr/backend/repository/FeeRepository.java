package com.kvr.backend.repository;

import com.kvr.backend.entity.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {

    List<Fee> findByAcademicYear(String academicYear);

    List<Fee> findByClassId(Long classId);

    List<Fee> findByStudentId(Long studentId);

    Optional<Fee> findByStudentIdAndAcademicYear(
            Long studentId,
            String academicYear
    );
}