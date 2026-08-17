package com.kvr.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "attendance",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_attendance_student_date",
            columnNames = {"student_id", "attendance_date"}
        )
    },
    indexes = {
        @Index(
            name = "idx_attendance_student",
            columnList = "student_id"
        ),
        @Index(
            name = "idx_attendance_class",
            columnList = "class_id"
        ),
        @Index(
            name = "idx_attendance_date",
            columnList = "attendance_date"
        )
    }
)
public class Attendance {

    // =========================================================
    // PRIMARY KEY
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // STUDENT
    // =========================================================

    @Column(name = "student_id", nullable = false)
    private Long studentId;


    // =========================================================
    // CLASS
    // =========================================================

    @Column(name = "class_id", nullable = false)
    private Long classId;


    // =========================================================
    // ATTENDANCE DATE
    // =========================================================

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;


    // =========================================================
    // ACADEMIC YEAR
    // =========================================================

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;


    // =========================================================
    // STATUS
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AttendanceStatus status;


    // =========================================================
    // REMARKS
    // =========================================================

    @Column(name = "remarks", length = 255)
    private String remarks;


    // =========================================================
    // AUDIT
    // =========================================================

    @Column(
        name = "created_at",
        insertable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
        name = "updated_at",
        insertable = false,
        updatable = false
    )
    private LocalDateTime updatedAt;


    // =========================================================
    // CONSTRUCTORS
    // =========================================================

    public Attendance() {
    }


    // =========================================================
    // ENUM
    // =========================================================

    public enum AttendanceStatus {
        PRESENT,
        ABSENT,
        LATE,
        HALF_DAY
    }


    // =========================================================
    // GETTERS / SETTERS
    // =========================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}