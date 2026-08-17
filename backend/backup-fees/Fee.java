package com.kvr.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "fees",
    indexes = {
        @Index(name = "idx_fee_student", columnList = "student_id"),
        @Index(name = "idx_fee_class", columnList = "class_id"),
        @Index(name = "idx_fee_academic_year", columnList = "academic_year")
    }
)
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================================================
    // Student relationship
    // =========================================================

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "class_id", nullable = false)
    private Long classId;

    // =========================================================
    // Fee details
    // =========================================================

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;

    @Column(name = "school_fee", precision = 10, scale = 2, nullable = false)
    private BigDecimal schoolFee = BigDecimal.ZERO;

    @Column(name = "bus_fee", precision = 10, scale = 2, nullable = false)
    private BigDecimal busFee = BigDecimal.ZERO;

    @Column(name = "total_fee", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalFee = BigDecimal.ZERO;

    @Column(name = "paid_fee", precision = 10, scale = 2, nullable = false)
    private BigDecimal paidFee = BigDecimal.ZERO;

    @Column(name = "pending_fee", precision = 10, scale = 2, nullable = false)
    private BigDecimal pendingFee = BigDecimal.ZERO;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "remarks", length = 500)
    private String remarks;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;


    public Fee() {
    }


    // =========================================================
    // Getters and Setters
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

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public BigDecimal getSchoolFee() {
        return schoolFee;
    }

    public void setSchoolFee(BigDecimal schoolFee) {
        this.schoolFee = schoolFee;
    }

    public BigDecimal getBusFee() {
        return busFee;
    }

    public void setBusFee(BigDecimal busFee) {
        this.busFee = busFee;
    }

    public BigDecimal getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(BigDecimal totalFee) {
        this.totalFee = totalFee;
    }

    public BigDecimal getPaidFee() {
        return paidFee;
    }

    public void setPaidFee(BigDecimal paidFee) {
        this.paidFee = paidFee;
    }

    public BigDecimal getPendingFee() {
        return pendingFee;
    }

    public void setPendingFee(BigDecimal pendingFee) {
        this.pendingFee = pendingFee;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}