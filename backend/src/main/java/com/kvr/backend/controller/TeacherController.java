package com.kvr.backend.controller;

import com.kvr.backend.entity.Teacher;
import com.kvr.backend.service.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(
            TeacherService teacherService) {

        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {

        return ResponseEntity.ok(
                teacherService.getAllTeachers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacher(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    teacherService.getTeacherById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PostMapping
    public ResponseEntity<Teacher> createTeacher(
            @RequestBody Teacher teacher) {

        try {

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                            teacherService.createTeacher(
                                    teacher
                            )
                    );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(
            @PathVariable Long id,
            @RequestBody Teacher teacher) {

        try {

            return ResponseEntity.ok(
                    teacherService.updateTeacher(
                            id,
                            teacher
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(
            @PathVariable Long id) {

        try {

            teacherService.deleteTeacher(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Teacher>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                teacherService.getAllTeachers()
                        .stream()
                        .filter(teacher ->
                                status.equalsIgnoreCase(
                                        teacher.getStatus()
                                )
                        )
                        .toList()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<Teacher>> search(
            @RequestParam String name) {

        return ResponseEntity.ok(
                teacherService
                        .getAllTeachers()
                        .stream()
                        .filter(teacher ->
                                teacher.getFullName()
                                        .toLowerCase()
                                        .contains(
                                                name.toLowerCase()
                                        )
                        )
                        .toList()
        );
    }
}