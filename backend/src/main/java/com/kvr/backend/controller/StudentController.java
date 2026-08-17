package com.kvr.backend.controller;

import com.kvr.backend.entity.Student;
import com.kvr.backend.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // =========================================================
    // GET ALL STUDENTS
    // GET /api/students
    // =========================================================

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        return ResponseEntity.ok(
                studentService.getAllStudents()
        );
    }

    // =========================================================
    // GET STUDENT BY ID
    // GET /api/students/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Long id) {

        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // =========================================================
    // GET STUDENT BY ADMISSION NUMBER
    // GET /api/students/admission/{admissionNo}
    // =========================================================

    @GetMapping("/admission/{admissionNo}")
    public ResponseEntity<Student> getStudentByAdmissionNo(
            @PathVariable String admissionNo) {

        return studentService
                .getStudentByAdmissionNo(admissionNo)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // =========================================================
    // GET STUDENTS BY CLASS
    // GET /api/students/class/{classId}
    // =========================================================

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Student>> getStudentsByClass(
            @PathVariable Long classId) {

        return ResponseEntity.ok(
                studentService.getStudentsByClass(classId)
        );
    }

    // =========================================================
    // GET STUDENTS BY ACADEMIC YEAR
    // GET /api/students/year/{academicYear}
    // =========================================================

    @GetMapping("/year/{academicYear}")
    public ResponseEntity<List<Student>> getStudentsByAcademicYear(
            @PathVariable String academicYear) {

        return ResponseEntity.ok(
                studentService.getStudentsByAcademicYear(
                        academicYear
                )
        );
    }

    // =========================================================
    // GET STUDENTS BY STATUS
    // GET /api/students/status/{status}
    // =========================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Student>> getStudentsByStatus(
            @PathVariable Student.StudentStatus status) {

        return ResponseEntity.ok(
                studentService.getStudentsByStatus(status)
        );
    }

    // =========================================================
    // SEARCH STUDENTS BY NAME
    // GET /api/students/search?name=Rahul
    // =========================================================

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(
            @RequestParam String name) {

        return ResponseEntity.ok(
                studentService.searchStudentsByName(name)
        );
    }

    // =========================================================
    // GET STUDENTS BY PARENT MOBILE
    // GET /api/students/parent-mobile/{mobile}
    // =========================================================

    @GetMapping("/parent-mobile/{mobile}")
    public ResponseEntity<List<Student>> getStudentsByParentMobile(
            @PathVariable String mobile) {

        return ResponseEntity.ok(
                studentService.getStudentsByParentMobile(mobile)
        );
    }

    // =========================================================
    // GET STUDENTS BY CLASS + STATUS
    // GET /api/students/class/{classId}/status/{status}
    // =========================================================

    @GetMapping("/class/{classId}/status/{status}")
    public ResponseEntity<List<Student>> getStudentsByClassAndStatus(
            @PathVariable Long classId,
            @PathVariable Student.StudentStatus status) {

        return ResponseEntity.ok(
                studentService.getStudentsByClassAndStatus(
                        classId,
                        status
                )
        );
    }

    // =========================================================
    // CREATE STUDENT
    // POST /api/students
    // =========================================================

    @PostMapping
    public ResponseEntity<Student> createStudent(
            @RequestBody Student student) {

        try {

            Student savedStudent =
                    studentService.createStudent(student);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedStudent);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
    }

    // =========================================================
    // UPDATE STUDENT
    // PUT /api/students/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        try {

            Student updatedStudent =
                    studentService.updateStudent(id, student);

            return ResponseEntity.ok(updatedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================================================
    // DELETE STUDENT
    // DELETE /api/students/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable Long id) {

        try {

            studentService.deleteStudent(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================================================
    // CHECK STUDENT EXISTS
    // GET /api/students/{id}/exists
    // =========================================================

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> studentExists(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.studentExists(id)
        );
    }

    // =========================================================
    // CHECK ADMISSION NUMBER
    // GET /api/students/check-admission/{admissionNo}
    // =========================================================

    @GetMapping("/check-admission/{admissionNo}")
    public ResponseEntity<Boolean> admissionNumberExists(
            @PathVariable String admissionNo) {

        return ResponseEntity.ok(
                studentService.admissionNumberExists(
                        admissionNo
                )
        );
    }
}
