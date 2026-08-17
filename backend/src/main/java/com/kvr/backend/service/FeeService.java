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
    // CREATE FEE
    // =========================================================

    public FeeResponse createFee(Fee fee) {

        validateFee(fee);

        Student student =
                studentRepository
                        .findById(fee.getStudentId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Student not found"
                                )
                        );

        validateClass(fee.getClassId());

        BigDecimal schoolFee =
                safeValue(fee.getSchoolFee());

        BigDecimal busFee =
                safeValue(fee.getBusFee());

        BigDecimal paidFee =
                safeValue(fee.getPaidFee());

        BigDecimal totalFee =
                schoolFee.add(busFee);

        validatePaidFee(
                paidFee,
                totalFee
        );

        BigDecimal pendingFee =
                totalFee.subtract(paidFee);

        fee.setSchoolFee(schoolFee);
        fee.setBusFee(busFee);
        fee.setTotalFee(totalFee);
        fee.setPaidFee(paidFee);
        fee.setPendingFee(pendingFee);

        /*
         * If a fee already exists for this student
         * and academic year, update that record instead
         * of creating a duplicate.
         */
        Optional<Fee> existing =
                feeRepository.findByStudentIdAndAcademicYear(
                        fee.getStudentId(),
                        fee.getAcademicYear()
                );

        if (existing.isPresent()) {

            Fee current = existing.get();

            current.setClassId(fee.getClassId());
            current.setAcademicYear(fee.getAcademicYear());
            current.setSchoolFee(schoolFee);
            current.setBusFee(busFee);
            current.setTotalFee(totalFee);
            current.setPaidFee(paidFee);
            current.setPendingFee(pendingFee);
            current.setPaymentDate(fee.getPaymentDate());
            current.setRemarks(fee.getRemarks());

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
    // UPDATE FEE
    // =========================================================

    public FeeResponse updateFee(
            Long id,
            Fee incomingFee
    ) {

        validateFee(incomingFee);

        Fee current =
                feeRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Fee record not found"
                                )
                        );

        Student student =
                studentRepository
                        .findById(incomingFee.getStudentId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Student not found"
                                )
                        );

        validateClass(incomingFee.getClassId());

        BigDecimal schoolFee =
                safeValue(incomingFee.getSchoolFee());

        BigDecimal busFee =
                safeValue(incomingFee.getBusFee());

        BigDecimal paidFee =
                safeValue(incomingFee.getPaidFee());

        BigDecimal totalFee =
                schoolFee.add(busFee);

        validatePaidFee(
                paidFee,
                totalFee
        );

        BigDecimal pendingFee =
                totalFee.subtract(paidFee);

        current.setStudentId(
                incomingFee.getStudentId()
        );

        current.setClassId(
                incomingFee.getClassId()
        );

        current.setAcademicYear(
                incomingFee.getAcademicYear()
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
                incomingFee.getPaymentDate()
        );

        current.setRemarks(
                incomingFee.getRemarks()
        );

        Fee saved =
                feeRepository.save(current);

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
    // VALIDATION
    // =========================================================

    private void validateFee(Fee fee) {

        if (fee == null) {

            throw new IllegalArgumentException(
                    "Fee data is required"
            );
        }

        if (fee.getStudentId() == null) {

            throw new IllegalArgumentException(
                    "Student is required"
            );
        }

        if (fee.getClassId() == null) {

            throw new IllegalArgumentException(
                    "Class is required"
            );
        }

        if (fee.getAcademicYear() == null ||
                fee.getAcademicYear().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Academic year is required"
            );
        }
    }


    // =========================================================
    // VALIDATE CLASS
    // =========================================================

    private void validateClass(Long classId) {

        if (!schoolClassRepository.existsById(classId)) {

            throw new IllegalArgumentException(
                    "Class not found"
            );
        }
    }


    // =========================================================
    // VALIDATE PAID AMOUNT
    // =========================================================

    private void validatePaidFee(
            BigDecimal paidFee,
            BigDecimal totalFee
    ) {

        if (paidFee.compareTo(totalFee) > 0) {

            throw new IllegalArgumentException(
                    "Paid fee cannot be greater than total fee"
            );
        }
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

        /*
         * Student class is used as the authoritative
         * class information for display.
         */
        response.setClassId(
                fee.getClassId()
        );

        if (fee.getClassId() != null) {

            schoolClassRepository
                    .findById(fee.getClassId())
                    .ifPresent(schoolClass -> {

                        response.setClassName(
                                schoolClass.getClassName()
                        );

                        response.setSection(
                                schoolClass.getSection()
                        );
                    });
        }

        response.setAcademicYear(
                fee.getAcademicYear()
        );

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

        response.setPaymentDate(
                fee.getPaymentDate()
        );

        /*
         * Keep lastPaymentDate populated too,
         * for compatibility with existing frontend code.
         */
        response.setLastPaymentDate(
                fee.getPaymentDate()
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