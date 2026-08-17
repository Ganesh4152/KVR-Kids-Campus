package com.kvr.backend.service;

import com.kvr.backend.entity.Student;
import com.kvr.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // =========================================================
    // Get all students
    // =========================================================

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    // =========================================================
    // Get student by ID
    // =========================================================

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }


    // =========================================================
    // Get student by admission number
    // =========================================================

    public Optional<Student> getStudentByAdmissionNo(String admissionNo) {
        return studentRepository.findByAdmissionNo(admissionNo);
    }


    // =========================================================
    // Get students by class
    // =========================================================

    public List<Student> getStudentsByClass(Long classId) {
        return studentRepository.findByClassId(classId);
    }


    // =========================================================
    // Get students by academic year
    // =========================================================

    public List<Student> getStudentsByAcademicYear(String academicYear) {
        return studentRepository.findByAcademicYear(academicYear);
    }


    // =========================================================
    // Get students by status
    // =========================================================

    public List<Student> getStudentsByStatus(Student.StudentStatus status) {
        return studentRepository.findByStatus(status);
    }


    // =========================================================
    // Get students by parent mobile
    // =========================================================

    public List<Student> getStudentsByParentMobile(String parentMobile) {
        return studentRepository.findByParentMobile(parentMobile);
    }


    // =========================================================
    // Search students by name
    // =========================================================

    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByFullNameContainingIgnoreCase(name);
    }


    // =========================================================
    // Get students by class and status
    // =========================================================

    public List<Student> getStudentsByClassAndStatus(
            Long classId,
            Student.StudentStatus status) {

        return studentRepository.findByClassIdAndStatus(
                classId,
                status
        );
    }


    // =========================================================
    // Get students by academic year and status
    // =========================================================

    public List<Student> getStudentsByAcademicYearAndStatus(
            String academicYear,
            Student.StudentStatus status) {

        return studentRepository.findByAcademicYearAndStatus(
                academicYear,
                status
        );
    }


    // =========================================================
    // Create student
    // =========================================================

   public Student createStudent(Student student) {

    if (studentRepository.existsByAdmissionNo(
            student.getAdmissionNo())) {

        throw new IllegalArgumentException(
                "Admission number already exists: "
                        + student.getAdmissionNo()
        );
    }

    // Common student login password
    student.setPassword("student123");

    return studentRepository.save(student);
}


    // =========================================================
    // Update student
    // =========================================================

    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found with id: " + id
                        )
                );

        /*
         * Keep the existing database ID.
         */
        existingStudent.setAdmissionNo(
                updatedStudent.getAdmissionNo()
        );

        existingStudent.setRollNo(
                updatedStudent.getRollNo()
        );

        existingStudent.setFirstName(
                updatedStudent.getFirstName()
        );

        existingStudent.setLastName(
                updatedStudent.getLastName()
        );

        existingStudent.setFullName(
                updatedStudent.getFullName()
        );

        existingStudent.setGender(
                updatedStudent.getGender()
        );

        existingStudent.setDateOfBirth(
                updatedStudent.getDateOfBirth()
        );

        existingStudent.setBloodGroup(
                updatedStudent.getBloodGroup()
        );

        existingStudent.setAadhaarNumber(
                updatedStudent.getAadhaarNumber()
        );

        existingStudent.setStudentPhoto(
                updatedStudent.getStudentPhoto()
        );

        existingStudent.setClassId(
                updatedStudent.getClassId()
        );

        existingStudent.setAdmissionDate(
                updatedStudent.getAdmissionDate()
        );

        existingStudent.setAcademicYear(
                updatedStudent.getAcademicYear()
        );

        existingStudent.setFatherName(
                updatedStudent.getFatherName()
        );

        existingStudent.setMotherName(
                updatedStudent.getMotherName()
        );

        existingStudent.setGuardianName(
                updatedStudent.getGuardianName()
        );

        existingStudent.setParentMobile(
                updatedStudent.getParentMobile()
        );

        existingStudent.setAlternateMobile(
                updatedStudent.getAlternateMobile()
        );

        existingStudent.setParentEmail(
                updatedStudent.getParentEmail()
        );

        existingStudent.setOccupation(
                updatedStudent.getOccupation()
        );

        existingStudent.setAnnualIncome(
                updatedStudent.getAnnualIncome()
        );

        existingStudent.setAddressLine1(
                updatedStudent.getAddressLine1()
        );

        existingStudent.setAddressLine2(
                updatedStudent.getAddressLine2()
        );

        existingStudent.setVillage(
                updatedStudent.getVillage()
        );

        existingStudent.setMandal(
                updatedStudent.getMandal()
        );

        existingStudent.setDistrict(
                updatedStudent.getDistrict()
        );

        existingStudent.setState(
                updatedStudent.getState()
        );

        existingStudent.setCountry(
                updatedStudent.getCountry()
        );

        existingStudent.setPincode(
                updatedStudent.getPincode()
        );

        existingStudent.setBusRequired(
                updatedStudent.getBusRequired()
        );

        existingStudent.setBusRoute(
                updatedStudent.getBusRoute()
        );

        existingStudent.setPickupPoint(
                updatedStudent.getPickupPoint()
        );

        existingStudent.setFeeCategory(
                updatedStudent.getFeeCategory()
        );

        existingStudent.setTotalFee(
                updatedStudent.getTotalFee()
        );

        existingStudent.setPaidFee(
                updatedStudent.getPaidFee()
        );

        existingStudent.setPendingFee(
                updatedStudent.getPendingFee()
        );

        existingStudent.setScholarship(
                updatedStudent.getScholarship()
        );

        existingStudent.setHostelRequired(
                updatedStudent.getHostelRequired()
        );

        existingStudent.setMedicalCondition(
                updatedStudent.getMedicalCondition()
        );

        existingStudent.setAllergies(
                updatedStudent.getAllergies()
        );

        existingStudent.setEmergencyContactName(
                updatedStudent.getEmergencyContactName()
        );

        existingStudent.setEmergencyContactNumber(
                updatedStudent.getEmergencyContactNumber()
        );

        existingStudent.setPreviousSchool(
                updatedStudent.getPreviousSchool()
        );

        existingStudent.setTcNumber(
                updatedStudent.getTcNumber()
        );

        existingStudent.setRemarks(
                updatedStudent.getRemarks()
        );

        existingStudent.setStatus(
                updatedStudent.getStatus()
        );

        return studentRepository.save(existingStudent);
    }


    // =========================================================
    // Delete student
    // =========================================================

    public void deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {

            throw new RuntimeException(
                    "Student not found with id: " + id
            );
        }

        studentRepository.deleteById(id);
    }


    // =========================================================
    // Check student exists
    // =========================================================

    public boolean studentExists(Long id) {
        return studentRepository.existsById(id);
    }


    // =========================================================
    // Check admission number exists
    // =========================================================

    public boolean admissionNumberExists(String admissionNo) {
        return studentRepository.existsByAdmissionNo(admissionNo);
    }
}
