package com.kvr.backend.controller;

import com.kvr.backend.entity.Admin;
import com.kvr.backend.repository.AdminRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AdminRepository adminRepository;

    public AuthController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if (request.username() == null || request.password() == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "success", false,
                            "message", "Username and password are required"
                    ));
        }

        Optional<Admin> adminOptional =
                adminRepository.findByUsername(request.username());

        if (adminOptional.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Invalid username or password"
                    ));
        }

        Admin admin = adminOptional.get();

        if (admin.getStatus() != Admin.AdminStatus.ACTIVE) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of(
                            "success", false,
                            "message", "Admin account is inactive"
                    ));
        }

        /*
         * Development authentication.
         *
         * Current database contains:
         *
         * username = admin
         * password = admin123
         *
         * This will be changed to BCrypt authentication
         * before production deployment.
         */
        if (!admin.getPassword().equals(request.password())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Invalid username or password"
                    ));
        }

        admin.setLastLogin(LocalDateTime.now());
        adminRepository.save(admin);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Login successful",
                        "user", Map.of(
                                "id", admin.getId(),
                                "username", admin.getUsername(),
                                "fullName", admin.getFullName(),
                                "email", admin.getEmail() == null
                                        ? ""
                                        : admin.getEmail(),
                                "mobile", admin.getMobile() == null
                                        ? ""
                                        : admin.getMobile(),
                                "role", admin.getRole()
                        )
                )
        );
    }

    public record LoginRequest(
            String username,
            String password
    ) {
    }
}