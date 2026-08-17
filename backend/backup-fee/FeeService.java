package com.kvr.backend.service;

import com.kvr.backend.dto.FeeResponse;
import com.kvr.backend.entity.Fee;
import com.kvr.backend.entity.SchoolClass;
import com.kvr.backend.entity.Student;
import com.kvr.backend.repository.FeeRepository;
import com.kvr.backend.repository.SchoolClassRepository;
import com.kvr.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;
    private final SchoolClassRepository schoolClassRepository;

    public FeeService(
            FeeRepository feeRepository,
            StudentRepository studentRepository,
            SchoolClassRepository schoolClassRepository
    ) {
        this.feeRepository = feeRepository;
        this.studentRepository = studentRepository;
        this.schoolClassRepository = schoolClassRepository;
    }


    // =========================================================
    // GET ALL FEES
    // =========================================================

    public List<FeeResponse> getAllFees() {

        List<Fee> fees = feeRepository.findAll();

        List<FeeResponse> response = new ArrayList<>();

        for (Fee fee : fees) {

            studentRepository
                    .findById(fee.getStudentId())
                    .ifPresent(student ->
                            response.add(
                                    buildResponse(fee, student)
                            )
                    );
        }

        return response;
    }


    // =========================================================
    // GET FEE BY ID
    // =========================================================

    public Optional<FeeResponse> getFeeById(Long id) {

        Optional<Fee> feeOptional =
                feeRepository.findById(id);

        if (feeOptional.isEmpty()) {
            return Optional.empty();
        }

        Fee fee = feeOptional.get();

        Optional<Student> studentOptional =
                studentRepository.findById(
                        fee.getStudentId()
                );

        if (studentOptional.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(
                buildResponse(
                        fee,
                        studentOptional.get()
                )
        );
    }


    // =========================================================
    // GET FEES BY STUDENT
    // =========================================================

    public List<FeeResponse> getFeesByStudentId(
            Long studentId
    ) {

        Optional<Student> studentOptional =
                studentRepository.findById(studentId);

        if (studentOptional.isEmpty()) {
            return new ArrayList<>();
        }

        Student student = studentOptional.get();

        List<Fee> fees =
                feeRepository.findByStudentId(studentId);

        List<FeeResponse> response =
                new ArrayList<>();

        for (Fee fee : fees) {

            response.add(
                    buildResponse(
                            fee,
                            student
                    )
            );
        }

        return response;
    }


    // =========================================================
    // GET FEES BY CLASS
    // =========================================================

    public List<FeeResponse> getFeesByClassId(
            Long classId
    ) {

        List<Fee> fees =
                feeRepository.findByClassId(classId);

        List<FeeResponse> response =
                new ArrayList<>();

        for (Fee fee : fees) {

            studentRepository
                    .findById(fee.getStudentId())
                    .ifPresent(student ->
                            response.add(
                                    buildResponse(
                                            fee,
                                            student
                                    )
                            )
                    );
        }

        return response;
    }


    // =========================================================
    // GET FEES BY ACADEMIC YEAR
    // =========================================================

    public List<FeeResponse> getFeesByAcademicYear(
            String academicYear
    ) {

        List<Fee> fees =
                feeRepository.findByAcademicYear(
                        academicYear
                );

        List<FeeResponse> response =
                new ArrayList<>();

        for (Fee fee : fees) {

            studentRepository
                    .findById(fee.getStudentId())
                    .ifPresent(student ->
                            response.add(
                                    buildResponse(
                                            fee,
                                            student
                                    )
                            )
                    );
        }

        return response;
    }


    // =========================================================
    // CREATE / UPDATE FEE
    // =========================================================

    public FeeResponse saveFee(Fee fee) {

        Student student =
                studentRepository
                        .findById(fee.getStudentId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Student not found"
                                )
                        );


        // -----------------------------------------------------
        // Validate values
        // -----------------------------------------------------

        BigDecimal schoolFee =
                safeValue(fee.getSchoolFee());

        BigDecimal busFee =
                safeValue(fee.getBusFee());

        BigDecimal paidFee =
                safeValue(fee.getPaidFee());


        // -----------------------------------------------------
        // Calculate total
        // -----------------------------------------------------

        BigDecimal totalFee =
                schoolFee.add(busFee);


        // -----------------------------------------------------
        // Validate paid amount
        // -----------------------------------------------------

        if (paidFee.compareTo(totalFee) > 0) {

            throw new IllegalArgumentException(
                    "Paid fee cannot be greater than total fee"
            );
        }


        // -----------------------------------------------------
        // Calculate pending
        // -----------------------------------------------------

        BigDecimal pendingFee =
                totalFee.subtract(paidFee);


        fee.setSchoolFee(schoolFee);
        fee.setBusFee(busFee);
        fee.setTotalFee(totalFee);
        fee.setPaidFee(paidFee);
        fee.setPendingFee(pendingFee);


        // -----------------------------------------------------
        // Find existing fee for student + academic year
        // -----------------------------------------------------

        Optional<Fee> existing =
                feeRepository.findByStudentIdAndAcademicYear(
                        fee.getStudentId(),
                        fee.getAcademicYear()
                );


        if (existing.isPresent()) {

            Fee current = existing.get();

            current.setStudentId(
                    fee.getStudentId()
            );

            current.setClassId(
                    fee.getClassId()
            );

            current.setAcademicYear(
                    fee.getAcademicYear()
            );

            current.setSchoolFee(
                    schoolFee
            );

            current.setBusFee(
                    busFee
            );

            current.setTotalFee(
                    totalFee
            );

            current.setPaidFee(
                    paidFee
            );

            current.setPendingFee(
                    pendingFee
            );

            current.setPaymentDate(
                    fee.getPaymentDate()
            );

            current.setRemarks(
                    fee.getRemarks()
            );

            fee = current;
        }


        Fee saved =
                feeRepository.save(fee);


        return buildResponse(
                saved,
                student
        );
    }


    // =========================================================
    // DELETE
    // =========================================================

    public void deleteFee(Long id) {

        if (!feeRepository.existsById(id)) {

            throw new IllegalArgumentException(
                    "Fee record not found"
            );
        }

        feeRepository.deleteById(id);
    }


    // =========================================================
    // BUILD RESPONSE
    // =========================================================

    private FeeResponse buildResponse(
            Fee fee,
            Student student
    ) {

        FeeResponse response =
                new FeeResponse();


        response.setId(
                fee.getId()
        );


        response.setStudentId(
                student.getId()
        );


        response.setAdmissionNo(
                student.getAdmissionNo()
        );


        response.setStudentName(
                student.getFullName()
        );


        response.setParentMobile(
                student.getParentMobile()
        );


        response.setClassId(
                student.getClassId()
        );


        // -----------------------------------------------------
        // Class name + section
        // -----------------------------------------------------

        if (student.getClassId() != null) {

            schoolClassRepository
                    .findById(student.getClassId())
                    .ifPresent(schoolClass -> {

                        response.setClassName(
                                schoolClass.getClassName()
                        );

                        response.setSection(
                                schoolClass.getSection()
                        );
                    });
        }


        // -----------------------------------------------------
        // Fee values
        // -----------------------------------------------------

        response.setSchoolFee(
                fee.getSchoolFee()
        );

        response.setBusFee(
                fee.getBusFee()
        );

        response.setTotalFee(
                fee.getTotalFee()
        );

        response.setPaidFee(
                fee.getPaidFee()
        );

        response.setPendingFee(
                fee.getPendingFee()
        );

        response.setRemarks(
                fee.getRemarks()
        );


        return response;
    }


    // =========================================================
    // SAFE DECIMAL VALUE
    // =========================================================

    private BigDecimal safeValue(
            BigDecimal value
    ) {

        if (value == null) {
            return BigDecimal.ZERO;
        }

        if (value.compareTo(BigDecimal.ZERO) < 0) {

            throw new IllegalArgumentException(
                    "Fee amount cannot be negative"
            );
        }

        return value;
    }
}