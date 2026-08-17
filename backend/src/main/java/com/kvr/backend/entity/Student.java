package com.kvr.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "students",
    indexes = {
        @Index(name = "idx_student_class", columnList = "class_id"),
        @Index(name = "idx_student_mobile", columnList = "parent_mobile"),
        @Index(name = "idx_student_name", columnList = "full_name"),
        @Index(name = "idx_student_admission", columnList = "admission_no")
    }
)
public class Student {

    // =========================================================
    // Primary Key
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // Student Identification
    // =========================================================

    @Column(name = "admission_no", nullable = false, unique = true, length = 20)
    private String admissionNo;

    @Column(name = "roll_no", nullable = false, length = 20)
    private String rollNo;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "blood_group", length = 5)
    private String bloodGroup;

    @Column(name = "aadhaar_number", length = 20)
    private String aadhaarNumber;

    @Column(name = "student_photo", length = 255)
    private String studentPhoto;

@Column(name = "password")
private String password;
    


    // =========================================================
    // Class / Academic Details
    // =========================================================

    @Column(name = "class_id", nullable = false)
    private Long classId;

    @Column(name = "admission_date", nullable = false)
    private LocalDate admissionDate;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;


    // =========================================================
    // Parent / Guardian Details
    // =========================================================

    @Column(name = "father_name", nullable = false, length = 100)
    private String fatherName;

    @Column(name = "mother_name", length = 100)
    private String motherName;

    @Column(name = "guardian_name", length = 100)
    private String guardianName;

    @Column(name = "parent_mobile", nullable = false, length = 15)
    private String parentMobile;

    @Column(name = "alternate_mobile", length = 15)
    private String alternateMobile;

    @Column(name = "parent_email", length = 100)
    private String parentEmail;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "annual_income", precision = 12, scale = 2)
    private BigDecimal annualIncome;


    // =========================================================
    // Address Details
    // =========================================================

    @Column(name = "address_line1", length = 255)
    private String addressLine1;

    @Column(name = "address_line2", length = 255)
    private String addressLine2;

    @Column(name = "village", length = 100)
    private String village;

    @Column(name = "mandal", length = 100)
    private String mandal;

    @Column(name = "district", length = 100)
    private String district;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "country", length = 100)
    private String country = "India";

    @Column(name = "pincode", length = 10)
    private String pincode;


    // =========================================================
    // Transport Details
    // =========================================================

    @Column(name = "bus_required")
    private Boolean busRequired = false;

    @Column(name = "bus_route", length = 100)
    private String busRoute;

    @Column(name = "pickup_point", length = 100)
    private String pickupPoint;


    // =========================================================
    // Fee Details
    // =========================================================

    /*
     * Stored as String intentionally.
     *
     * MySQL values:
     * Monthly
     * Quarterly
     * Half-Yearly
     * Yearly
     *
     * Using String avoids Java enum mismatch with "Half-Yearly".
     */
    @Column(name = "fee_category", length = 20)
    private String feeCategory = "Monthly";

    @Column(name = "total_fee", precision = 10, scale = 2)
    private BigDecimal totalFee = BigDecimal.ZERO;

    @Column(name = "paid_fee", precision = 10, scale = 2)
    private BigDecimal paidFee = BigDecimal.ZERO;

    @Column(name = "pending_fee", precision = 10, scale = 2)
    private BigDecimal pendingFee = BigDecimal.ZERO;

    @Column(name = "scholarship", precision = 10, scale = 2)
    private BigDecimal scholarship = BigDecimal.ZERO;


    // =========================================================
    // Hostel / Medical Details
    // =========================================================

    @Column(name = "hostel_required")
    private Boolean hostelRequired = false;

    @Column(name = "medical_condition", length = 255)
    private String medicalCondition;

    @Column(name = "allergies", length = 255)
    private String allergies;


    // =========================================================
    // Emergency Contact
    // =========================================================

    @Column(name = "emergency_contact_name", length = 100)
    private String emergencyContactName;

    @Column(name = "emergency_contact_number", length = 15)
    private String emergencyContactNumber;


    // =========================================================
    // Previous School
    // =========================================================

    @Column(name = "previous_school", length = 150)
    private String previousSchool;

    @Column(name = "tc_number", length = 50)
    private String tcNumber;


    // =========================================================
    // Other Details
    // =========================================================

    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StudentStatus status = StudentStatus.ACTIVE;


    // =========================================================
    // Audit Fields
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
    // Constructors
    // =========================================================

    public Student() {
    }


    // =========================================================
    // Enums
    // =========================================================

    public enum Gender {
        Male,
        Female,
        Other
    }

    public enum StudentStatus {
        ACTIVE,
        INACTIVE,
        TRANSFERRED,
        COMPLETED
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

    public String getAdmissionNo() {
        return admissionNo;
    }

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

    public void setAdmissionNo(String admissionNo) {
        this.admissionNo = admissionNo;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getStudentPhoto() {
        return studentPhoto;
    }

    public void setStudentPhoto(String studentPhoto) {
        this.studentPhoto = studentPhoto;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getParentMobile() {
        return parentMobile;
    }

    public void setParentMobile(String parentMobile) {
        this.parentMobile = parentMobile;
    }

    public String getAlternateMobile() {
        return alternateMobile;
    }

    public void setAlternateMobile(String alternateMobile) {
        this.alternateMobile = alternateMobile;
    }

    public String getParentEmail() {
        return parentEmail;
    }

    public void setParentEmail(String parentEmail) {
        this.parentEmail = parentEmail;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public BigDecimal getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(BigDecimal annualIncome) {
        this.annualIncome = annualIncome;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getMandal() {
        return mandal;
    }

    public void setMandal(String mandal) {
        this.mandal = mandal;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Boolean getBusRequired() {
        return busRequired;
    }

    public void setBusRequired(Boolean busRequired) {
        this.busRequired = busRequired;
    }

    public String getBusRoute() {
        return busRoute;
    }

    public void setBusRoute(String busRoute) {
        this.busRoute = busRoute;
    }

    public String getPickupPoint() {
        return pickupPoint;
    }

    public void setPickupPoint(String pickupPoint) {
        this.pickupPoint = pickupPoint;
    }

    public String getFeeCategory() {
        return feeCategory;
    }

    public void setFeeCategory(String feeCategory) {
        this.feeCategory = feeCategory;
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

    public BigDecimal getScholarship() {
        return scholarship;
    }

    public void setScholarship(BigDecimal scholarship) {
        this.scholarship = scholarship;
    }

    public Boolean getHostelRequired() {
        return hostelRequired;
    }

    public void setHostelRequired(Boolean hostelRequired) {
        this.hostelRequired = hostelRequired;
    }

    public String getMedicalCondition() {
        return medicalCondition;
    }

    public void setMedicalCondition(String medicalCondition) {
        this.medicalCondition = medicalCondition;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactNumber() {
        return emergencyContactNumber;
    }

    public void setEmergencyContactNumber(String emergencyContactNumber) {
        this.emergencyContactNumber = emergencyContactNumber;
    }

    public String getPreviousSchool() {
        return previousSchool;
    }

    public void setPreviousSchool(String previousSchool) {
        this.previousSchool = previousSchool;
    }

    public String getTcNumber() {
        return tcNumber;
    }

    public void setTcNumber(String tcNumber) {
        this.tcNumber = tcNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public StudentStatus getStatus() {
        return status;
    }

    public void setStatus(StudentStatus status) {
        this.status = status;
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
