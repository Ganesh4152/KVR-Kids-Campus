package com.kvr.backend.service;

import com.kvr.backend.entity.AdmissionApplication;
import com.kvr.backend.entity.AdmissionApplication.ApplicationStatus;
import com.kvr.backend.repository.AdmissionApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;

@Service
@Transactional
public class AdmissionApplicationService {

    private final AdmissionApplicationRepository repository;

    public AdmissionApplicationService(
            AdmissionApplicationRepository repository) {

        this.repository = repository;
    }

    // =========================================================
    // CREATE APPLICATION
    // =========================================================

    public AdmissionApplication createApplication(
            AdmissionApplication application) {

        if (application.getFirstName() == null ||
                application.getFirstName().isBlank()) {

            throw new IllegalArgumentException(
                    "First name is required"
            );
        }

        if (application.getFatherName() == null ||
                application.getFatherName().isBlank()) {

            throw new IllegalArgumentException(
                    "Father name is required"
            );
        }

        if (application.getParentMobile() == null ||
                application.getParentMobile().isBlank()) {

            throw new IllegalArgumentException(
                    "Parent mobile is required"
            );
        }

        if (application.getApplyingForClass() == null ||
                application.getApplyingForClass().isBlank()) {

            throw new IllegalArgumentException(
                    "Applying class is required"
            );
        }

        application.setApplicationNo(
                generateApplicationNumber()
        );

        application.setStatus(
                ApplicationStatus.NEW
        );

        if (application.getAcademicYear() == null ||
                application.getAcademicYear().isBlank()) {

            application.setAcademicYear(
                    "2026-2027"
            );
        }

        return repository.save(application);
    }

    // =========================================================
    // GET ALL APPLICATIONS
    // =========================================================

    @Transactional(readOnly = true)
    public List<AdmissionApplication> getAllApplications() {

        return repository.findAllByOrderByCreatedAtDesc();
    }

    // =========================================================
    // GET APPLICATION BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public AdmissionApplication getApplicationById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Admission application not found"
                        )
                );
    }

    // =========================================================
    // GET BY STATUS
    //
    // Existing method retained.
    // =========================================================

@Transactional(readOnly = true)
public List<AdmissionApplication> getApplicationsByStatus(
        ApplicationStatus status) {

    return repository.findByStatusOrderByCreatedAtDesc(status);
}

    // =========================================================
    // APPROVE APPLICATION
    //
    // PUT /api/admissions/{id}/approve
    // =========================================================

public AdmissionApplication approveApplication(
        Long id,
        String adminRemarks) {

    AdmissionApplication application =
            getApplicationById(id);

    application.setStatus(ApplicationStatus.APPROVED);

    if (adminRemarks != null) {
        application.setAdminRemarks(adminRemarks);
    }

    return repository.save(application);
}

    // =========================================================
    // REJECT APPLICATION
    //
    // PUT /api/admissions/{id}/reject
    // =========================================================
public AdmissionApplication rejectApplication(
        Long id,
        String adminRemarks) {

    AdmissionApplication application =
            getApplicationById(id);

    application.setStatus(ApplicationStatus.REJECTED);

    if (adminRemarks != null) {
        application.setAdminRemarks(adminRemarks);
    }

    return repository.save(application);
}
    // =========================================================
    // UPDATE STATUS
    // =========================================================

    public AdmissionApplication updateStatus(
            Long id,
            ApplicationStatus status) {

        AdmissionApplication application =
                getApplicationById(id);

        application.setStatus(status);

        return repository.save(application);
    }

    // =========================================================
    // UPDATE ADMIN REMARKS
    // =========================================================

    public AdmissionApplication updateAdminRemarks(
            Long id,
            String adminRemarks) {

        AdmissionApplication application =
                getApplicationById(id);

        application.setAdminRemarks(adminRemarks);

        return repository.save(application);
    }

    // =========================================================
    // DELETE APPLICATION
    // =========================================================

    public void deleteApplication(Long id) {

        if (!repository.existsById(id)) {

            throw new RuntimeException(
                    "Admission application not found"
            );
        }

        repository.deleteById(id);
    }

    // =========================================================
    // APPLICATION NUMBER
    // =========================================================

    private String generateApplicationNumber() {

        String year = String.valueOf(
                Year.now().getValue()
        );

        long nextNumber =
                repository.count() + 1;

        return String.format(
                "KVR-%s-%05d",
                year,
                nextNumber
        );
    }
}