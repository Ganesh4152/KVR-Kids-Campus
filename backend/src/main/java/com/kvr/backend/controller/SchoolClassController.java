package com.kvr.backend.controller;

import com.kvr.backend.entity.SchoolClass;
import com.kvr.backend.repository.SchoolClassRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:5173")
public class SchoolClassController {

    private final SchoolClassRepository repository;

    public SchoolClassController(
            SchoolClassRepository repository
    ) {
        this.repository = repository;
    }


    // =========================================================
    // GET ALL CLASSES
    // =========================================================

    @GetMapping
    public ResponseEntity<List<SchoolClass>> getAllClasses() {

        return ResponseEntity.ok(
                repository.findAll()
        );
    }


    // =========================================================
    // GET ACTIVE CLASSES
    // =========================================================

    @GetMapping("/active")
    public ResponseEntity<List<SchoolClass>> getActiveClasses() {

        return ResponseEntity.ok(
                repository.findByStatus(
                        SchoolClass.ClassStatus.ACTIVE
                )
        );
    }


    // =========================================================
    // GET CLASS BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getClassById(
            @PathVariable Long id
    ) {

        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .build()
                );
    }


    // =========================================================
    // CREATE CLASS
    // =========================================================

    @PostMapping
    public ResponseEntity<SchoolClass> createClass(
            @RequestBody SchoolClass schoolClass
    ) {

        if (schoolClass.getStatus() == null) {
            schoolClass.setStatus(
                    SchoolClass.ClassStatus.ACTIVE
            );
        }

        if (schoolClass.getCapacity() == null) {
            schoolClass.setCapacity(40);
        }

        SchoolClass saved =
                repository.save(schoolClass);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }


    // =========================================================
    // UPDATE CLASS
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClass(
            @PathVariable Long id,
            @RequestBody SchoolClass request
    ) {

        return repository.findById(id)
                .map(existing -> {

                    existing.setClassName(
                            request.getClassName()
                    );

                    existing.setSection(
                            request.getSection()
                    );

                    existing.setAcademicYear(
                            request.getAcademicYear()
                    );

                    existing.setClassTeacher(
                            request.getClassTeacher()
                    );

                    existing.setRoomNumber(
                            request.getRoomNumber()
                    );

                    existing.setCapacity(
                            request.getCapacity()
                    );

                    existing.setAgeFrom(
                            request.getAgeFrom()
                    );

                    existing.setAgeTo(
                            request.getAgeTo()
                    );

                    if (request.getStatus() != null) {
                        existing.setStatus(
                                request.getStatus()
                        );
                    }

                    SchoolClass updated =
                            repository.save(existing);

                    return ResponseEntity.ok(updated);
                })
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(null)
                );
    }


    // =========================================================
    // DEACTIVATE CLASS
    // =========================================================

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateClass(
            @PathVariable Long id
    ) {

        return repository.findById(id)
                .map(existing -> {

                    existing.setStatus(
                            SchoolClass.ClassStatus.INACTIVE
                    );

                    return ResponseEntity.ok(
                            repository.save(existing)
                    );
                })
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .build()
                );
    }


    // =========================================================
    // ACTIVATE CLASS
    // =========================================================

    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateClass(
            @PathVariable Long id
    ) {

        return repository.findById(id)
                .map(existing -> {

                    existing.setStatus(
                            SchoolClass.ClassStatus.ACTIVE
                    );

                    return ResponseEntity.ok(
                            repository.save(existing)
                    );
                })
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .build()
                );
    }


    // =========================================================
    // DELETE CLASS
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClass(
            @PathVariable Long id
    ) {

        if (!repository.existsById(id)) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            "Class not found"
                    );
        }

        repository.deleteById(id);

        return ResponseEntity.ok(
                "Class deleted successfully"
        );
    }
}