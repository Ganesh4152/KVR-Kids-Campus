package com.kvr.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentAuthController {

    private final JdbcTemplate jdbcTemplate;

    private static final String STUDENT_PASSWORD =
            "student123";


    public StudentAuthController(
            JdbcTemplate jdbcTemplate
    ) {

        this.jdbcTemplate = jdbcTemplate;
    }


    // =========================================================
    // STUDENT LOGIN
    //
    // POST /api/auth/student-login
    //
    // {
    //   "admissionNo": "KVR2026001",
    //   "password": "student123"
    // }
    // =========================================================

    @PostMapping("/student-login")
    public ResponseEntity<?> studentLogin(
            @RequestBody Map<String, Object> request
    ) {

        try {

            String admissionNo =
                    request.get("admissionNo") == null
                            ? ""
                            : String.valueOf(
                                    request.get("admissionNo")
                            ).trim();

            String password =
                    request.get("password") == null
                            ? ""
                            : String.valueOf(
                                    request.get("password")
                            );


            // -------------------------------------------------
            // VALIDATE
            // -------------------------------------------------

            if (admissionNo.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "message",
                                        "Admission ID is required"
                                )
                        );
            }


            if (!STUDENT_PASSWORD.equals(password)) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(
                                Map.of(
                                        "message",
                                        "Invalid password"
                                )
                        );
            }


            // -------------------------------------------------
            // FIND STUDENT
            // -------------------------------------------------

            String sql = """
                SELECT
                    s.id,
                    s.admission_no AS admissionNo,
                    s.roll_no AS rollNo,
                    s.first_name AS firstName,
                    s.last_name AS lastName,
                    s.full_name AS fullName,
                    s.gender,
                    s.date_of_birth AS dateOfBirth,
                    s.blood_group AS bloodGroup,

                    s.class_id AS classId,
                    c.class_name AS className,
                    c.section AS section,

                    s.academic_year AS academicYear,
                    s.admission_date AS admissionDate,

                    s.father_name AS fatherName,
                    s.mother_name AS motherName,

                    s.parent_mobile AS parentMobile,
                    s.parent_email AS parentEmail,

                    s.status AS status

                FROM students s

                LEFT JOIN classes c
                    ON c.id = s.class_id

                WHERE UPPER(s.admission_no) =
                      UPPER(?)

                  AND COALESCE(
                        s.status,
                        'ACTIVE'
                      ) = 'ACTIVE'
                """;


            List<Map<String, Object>> students =
                    jdbcTemplate.queryForList(
                            sql,
                            admissionNo
                    );


            if (students.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(
                                Map.of(
                                        "message",
                                        "Student not found or student account is inactive"
                                )
                        );
            }


            Map<String, Object> student =
                    students.get(0);


            // -------------------------------------------------
            // LOGIN RESPONSE
            // -------------------------------------------------

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "message",
                    "Student login successful"
            );

            response.put(
                    "role",
                    "STUDENT"
            );

            response.put(
                    "student",
                    student
            );


            return ResponseEntity.ok(
                    response
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "success",
                                    false,
                                    "message",
                                    "Student login failed",
                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }
}