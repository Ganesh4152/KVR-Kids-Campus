package com.kvr.backend.repository;

import com.kvr.backend.entity.AdmissionApplication;
import com.kvr.backend.entity.AdmissionApplication.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionApplicationRepository
        extends JpaRepository<AdmissionApplication, Long> {

    List<AdmissionApplication>
    findAllByOrderByCreatedAtDesc();

    List<AdmissionApplication>
    findByStatusOrderByCreatedAtDesc(
            ApplicationStatus status
    );

    List<AdmissionApplication>
    findByAcademicYearOrderByCreatedAtDesc(
            String academicYear
    );

    Optional<AdmissionApplication>
    findByApplicationNo(String applicationNo);

    List<AdmissionApplication>
    findByParentMobileOrderByCreatedAtDesc(
            String parentMobile
    );
}