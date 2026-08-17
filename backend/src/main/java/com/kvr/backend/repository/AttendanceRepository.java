package com.kvr.backend.repository;

import com.kvr.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByAttendanceDate(
            LocalDate attendanceDate
    );

    List<Attendance> findByClassIdAndAttendanceDate(
            Long classId,
            LocalDate attendanceDate
    );

    Optional<Attendance> findByStudentIdAndAttendanceDate(
            Long studentId,
            LocalDate attendanceDate
    );

    List<Attendance> findByStudentIdOrderByAttendanceDateDesc(
            Long studentId
    );

    boolean existsByStudentIdAndAttendanceDate(
            Long studentId,
            LocalDate attendanceDate
    );
}