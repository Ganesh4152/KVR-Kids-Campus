package com.kvr.backend.controller;

import com.kvr.backend.dto.FeeResponse;
import com.kvr.backend.entity.Fee;
import com.kvr.backend.service.FeeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:5173")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }


    // =========================================================
    // GET ALL FEES
    // GET /api/fees
    // =========================================================

    @GetMapping
    public ResponseEntity<List<FeeResponse>> getAllFees() {

        return ResponseEntity.ok(
                feeService.getAllFees()
        );
    }


    // =========================================================
    // GET FEE BY ID
    // GET /api/fees/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<FeeResponse> getFeeById(
            @PathVariable Long id
    ) {

        return feeService
                .getFeeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity
                                .notFound()
                                .build()
                );
    }


    // =========================================================
    // GET FEES BY STUDENT
    // GET /api/fees/student/{studentId}
    // =========================================================

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeeResponse>> getFeesByStudent(
            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                feeService.getFeesByStudentId(
                        studentId
                )
        );
    }


    // =========================================================
    // GET FEES BY CLASS
    // GET /api/fees/class/{classId}
    // =========================================================

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<FeeResponse>> getFeesByClass(
            @PathVariable Long classId
    ) {

        return ResponseEntity.ok(
                feeService.getFeesByClassId(
                        classId
                )
        );
    }


    // =========================================================
    // GET FEES BY ACADEMIC YEAR
    // GET /api/fees/year/{academicYear}
    // =========================================================

    @GetMapping("/year/{academicYear}")
    public ResponseEntity<List<FeeResponse>> getFeesByAcademicYear(
            @PathVariable String academicYear
    ) {

        return ResponseEntity.ok(
                feeService.getFeesByAcademicYear(
                        academicYear
                )
        );
    }


    // =========================================================
    // CREATE / UPDATE FEE
    // POST /api/fees
    // =========================================================

    @PostMapping
    public ResponseEntity<?> saveFee(
            @RequestBody Fee fee
    ) {

        try {

            FeeResponse saved =
                    feeService.saveFee(fee);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(saved);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================================================
    // DELETE FEE
    // DELETE /api/fees/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFee(
            @PathVariable Long id
    ) {

        try {

            feeService.deleteFee(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}