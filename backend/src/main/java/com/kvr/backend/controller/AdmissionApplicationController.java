package com.kvr.backend.controller;

import com.kvr.backend.entity.AdmissionApplication;
import com.kvr.backend.service.AdmissionApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
@CrossOrigin(origins = "http://localhost:5173")
public class AdmissionApplicationController {

    private final AdmissionApplicationService service;

    public AdmissionApplicationController(
            AdmissionApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> createApplication(
            @RequestBody AdmissionApplication application) {

        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(service.createApplication(application));

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(java.util.Map.of(
                            "message",
                            e.getMessage()
                    ));
        }
    }

    @GetMapping
    public ResponseEntity<List<AdmissionApplication>>
    getAllApplications() {

        return ResponseEntity.ok(
                service.getAllApplications()
        );
    }
}