package com.kvr.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class FeeResponse {

    private Long id;

    private Long studentId;

    private String admissionNo;

    private String studentName;

    private Long classId;

    private String className;

    // Added to support section in FeeService
    private String section;

    private String parentMobile;

    private String academicYear;

    private BigDecimal schoolFee;

    private BigDecimal busFee;

    private BigDecimal totalFee;

    private BigDecimal paidFee;

    private BigDecimal pendingFee;

    private LocalDate lastPaymentDate;

    private String remarks;


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


    public String getAdmissionNo() {
        return admissionNo;
    }

    public void setAdmissionNo(String admissionNo) {
        this.admissionNo = admissionNo;
    }


    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }


    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }


    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }


    // Added to support section in FeeService
    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }


    public String getParentMobile() {
        return parentMobile;
    }

    public void setParentMobile(String parentMobile) {
        this.parentMobile = parentMobile;
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


    public LocalDate getLastPaymentDate() {
        return lastPaymentDate;
    }

    public void setLastPaymentDate(LocalDate lastPaymentDate) {
        this.lastPaymentDate = lastPaymentDate;
    }


    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}