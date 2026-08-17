package com.kvr.backend.repository;

import com.kvr.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find student by admission number
    Optional<Student> findByAdmissionNo(String admissionNo);

    // Check whether admission number already exists
    boolean existsByAdmissionNo(String admissionNo);

    // Find students by class
    List<Student> findByClassId(Long classId);

    // Find students by academic year
    List<Student> findByAcademicYear(String academicYear);

    // Find students by status
    List<Student> findByStatus(Student.StudentStatus status);

    // Find students by parent mobile number
    List<Student> findByParentMobile(String parentMobile);

    // Search students by name
    List<Student> findByFullNameContainingIgnoreCase(String fullName);

    // Find students by class and status
    List<Student> findByClassIdAndStatus(
            Long classId,
            Student.StudentStatus status
    );

    // Find students by academic year and status
    List<Student> findByAcademicYearAndStatus(
            String academicYear,
            Student.StudentStatus status
    );
}
