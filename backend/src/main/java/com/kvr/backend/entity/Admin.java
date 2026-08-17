package com.kvr.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "admin",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_admin_username",
            columnNames = "username"
        )
    }
)
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "username",
        nullable = false,
        unique = true,
        length = 50
    )
    private String username;

    @Column(
        name = "password",
        nullable = false,
        length = 255
    )
    private String password;

    @Column(
        name = "full_name",
        nullable = false,
        length = 100
    )
    private String fullName;

    @Column(
        name = "email",
        length = 100
    )
    private String email;

    @Column(
        name = "mobile",
        length = 15
    )
    private String mobile;

    @Column(
        name = "role",
        length = 20
    )
    private String role = "ADMIN";

    @Enumerated(EnumType.STRING)
    @Column(
        name = "status",
        nullable = false
    )
    private AdminStatus status = AdminStatus.ACTIVE;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(
        name = "created_at",
        insertable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
        name = "updated_at",
        insertable = false,
        updatable = false
    )
    private LocalDateTime updatedAt;


    // =========================================================
    // ENUM
    // =========================================================

    public enum AdminStatus {
        ACTIVE,
        INACTIVE
    }


    // =========================================================
    // CONSTRUCTORS
    // =========================================================

    public Admin() {
    }


    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    public AdminStatus getStatus() {
        return status;
    }

    public void setStatus(AdminStatus status) {
        this.status = status;
    }


    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}