package com.kvr.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "classes")
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_name", nullable = false, length = 30)
    private String className;

    @Column(name = "section", nullable = false, length = 10)
    private String section;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;

    @Column(name = "class_teacher", length = 100)
    private String classTeacher;

    @Column(name = "room_number", length = 20)
    private String roomNumber;

    @Column(name = "capacity")
    private Integer capacity = 40;

    @Column(name = "age_from")
    private Integer ageFrom;

    @Column(name = "age_to")
    private Integer ageTo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ClassStatus status = ClassStatus.ACTIVE;

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

    public Class() {
    }

    public enum ClassStatus {
        ACTIVE,
        INACTIVE
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getClassTeacher() {
        return classTeacher;
    }

    public void setClassTeacher(String classTeacher) {
        this.classTeacher = classTeacher;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getAgeFrom() {
        return ageFrom;
    }

    public void setAgeFrom(Integer ageFrom) {
        this.ageFrom = ageFrom;
    }

    public Integer getAgeTo() {
        return ageTo;
    }

    public void setAgeTo(Integer ageTo) {
        this.ageTo = ageTo;
    }

    public ClassStatus getStatus() {
        return status;
    }

    public void setStatus(ClassStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
