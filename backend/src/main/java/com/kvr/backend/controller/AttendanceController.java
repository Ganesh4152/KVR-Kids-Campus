package com.kvr.backend.controller;

import com.kvr.backend.entity.Attendance;
import com.kvr.backend.service.AttendanceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService =
                attendanceService;
    }


    // =========================================================
    // GET ALL
    // GET /api/attendance
    // =========================================================

    @GetMapping
    public ResponseEntity<List<Attendance>>
    getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance()
        );
    }


    // =========================================================
    // GET BY DATE
    // GET /api/attendance/date/2026-08-17
    // =========================================================

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>>
    getByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                attendanceService.getByDate(date)
        );
    }


    // =========================================================
    // GET BY CLASS + DATE
    // GET /api/attendance/class/1/date/2026-08-17
    // =========================================================

    @GetMapping("/class/{classId}/date/{date}")
    public ResponseEntity<List<Attendance>>
    getByClassAndDate(
            @PathVariable Long classId,
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                attendanceService
                        .getByClassAndDate(
                                classId,
                                date
                        )
        );
    }


    // =========================================================
    // GET BY STUDENT
    // GET /api/attendance/student/1
    // =========================================================

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>>
    getByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                attendanceService
                        .getByStudent(studentId)
        );
    }


    // =========================================================
    // SAVE ONE
    // POST /api/attendance
    // =========================================================

    @PostMapping
    public ResponseEntity<Attendance>
    saveAttendance(
            @RequestBody Attendance attendance) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        attendanceService
                                .saveAttendance(
                                        attendance
                                )
                );
    }


    // =========================================================
    // SAVE BULK
    // POST /api/attendance/bulk
    // =========================================================

    @PostMapping("/bulk")
    public ResponseEntity<List<Attendance>>
    saveBulk(
            @RequestBody List<Attendance> attendanceList) {

        return ResponseEntity.ok(
                attendanceService
                        .saveBulk(attendanceList)
        );
    }


    // =========================================================
    // DELETE
    // DELETE /api/attendance/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteAttendance(
            @PathVariable Long id) {

        try {

            attendanceService
                    .deleteAttendance(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}