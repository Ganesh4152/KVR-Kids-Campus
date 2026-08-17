package com.kvr.backend.service;

import com.kvr.backend.entity.Attendance;
import com.kvr.backend.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository) {

        this.attendanceRepository = attendanceRepository;
    }


    // =========================================================
    // GET ALL
    // =========================================================

    public List<Attendance> getAllAttendance() {

        return attendanceRepository.findAll();
    }


    // =========================================================
    // GET BY DATE
    // =========================================================

    public List<Attendance> getByDate(
            LocalDate date) {

        return attendanceRepository
                .findByAttendanceDate(date);
    }


    // =========================================================
    // GET BY CLASS + DATE
    // =========================================================

    public List<Attendance> getByClassAndDate(
            Long classId,
            LocalDate date) {

        return attendanceRepository
                .findByClassIdAndAttendanceDate(
                        classId,
                        date
                );
    }


    // =========================================================
    // GET STUDENT ATTENDANCE
    // =========================================================

    public List<Attendance> getByStudent(
            Long studentId) {

        return attendanceRepository
                .findByStudentIdOrderByAttendanceDateDesc(
                        studentId
                );
    }


    // =========================================================
    // SAVE
    // =========================================================

    public Attendance saveAttendance(
            Attendance attendance) {

        return attendanceRepository.save(
                attendance
        );
    }


    // =========================================================
    // BULK SAVE
    // =========================================================

    public List<Attendance> saveBulk(
            List<Attendance> attendanceList) {

        return attendanceList.stream()
                .map(this::saveOrUpdate)
                .toList();
    }


    // =========================================================
    // SAVE OR UPDATE
    // =========================================================

    private Attendance saveOrUpdate(
            Attendance attendance) {

        return attendanceRepository
                .findByStudentIdAndAttendanceDate(
                        attendance.getStudentId(),
                        attendance.getAttendanceDate()
                )
                .map(existing -> {

                    existing.setClassId(
                            attendance.getClassId()
                    );

                    existing.setAcademicYear(
                            attendance.getAcademicYear()
                    );

                    existing.setStatus(
                            attendance.getStatus()
                    );

                    existing.setRemarks(
                            attendance.getRemarks()
                    );

                    return attendanceRepository.save(
                            existing
                    );
                })
                .orElseGet(() ->
                        attendanceRepository.save(
                                attendance
                        )
                );
    }


    // =========================================================
    // DELETE
    // =========================================================

    public void deleteAttendance(
            Long id) {

        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Attendance not found"
            );
        }

        attendanceRepository.deleteById(id);
    }
}