package com.kvr.backend.service;

import com.kvr.backend.entity.Teacher;
import com.kvr.backend.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Teacher not found with id: " + id
                        )
                );
    }

    public Teacher createTeacher(Teacher teacher) {

        if (teacherRepository.existsByEmployeeId(
                teacher.getEmployeeId())) {

            throw new IllegalArgumentException(
                    "Employee ID already exists: "
                            + teacher.getEmployeeId()
            );
        }

        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(
            Long id,
            Teacher updatedTeacher) {

        Teacher existing = getTeacherById(id);

        existing.setEmployeeId(
                updatedTeacher.getEmployeeId()
        );

        existing.setFirstName(
                updatedTeacher.getFirstName()
        );

        existing.setLastName(
                updatedTeacher.getLastName()
        );

        existing.setFullName(
                updatedTeacher.getFullName()
        );

        existing.setGender(
                updatedTeacher.getGender()
        );

        existing.setDateOfBirth(
                updatedTeacher.getDateOfBirth()
        );

        existing.setQualification(
                updatedTeacher.getQualification()
        );

        existing.setSpecialization(
                updatedTeacher.getSpecialization()
        );

        existing.setExperienceYears(
                updatedTeacher.getExperienceYears()
        );

        existing.setJoiningDate(
                updatedTeacher.getJoiningDate()
        );

        existing.setMobile(
                updatedTeacher.getMobile()
        );

        existing.setAlternateMobile(
                updatedTeacher.getAlternateMobile()
        );

        existing.setEmail(
                updatedTeacher.getEmail()
        );

        existing.setAddressLine1(
                updatedTeacher.getAddressLine1()
        );

        existing.setAddressLine2(
                updatedTeacher.getAddressLine2()
        );

        existing.setVillage(
                updatedTeacher.getVillage()
        );

        existing.setMandal(
                updatedTeacher.getMandal()
        );

        existing.setDistrict(
                updatedTeacher.getDistrict()
        );

        existing.setState(
                updatedTeacher.getState()
        );

        existing.setCountry(
                updatedTeacher.getCountry()
        );

        existing.setPincode(
                updatedTeacher.getPincode()
        );

        existing.setDesignation(
                updatedTeacher.getDesignation()
        );

        existing.setDepartment(
                updatedTeacher.getDepartment()
        );

        existing.setClassId(
                updatedTeacher.getClassId()
        );

        existing.setSection(
                updatedTeacher.getSection()
        );

        existing.setSalary(
                updatedTeacher.getSalary()
        );

        existing.setStatus(
                updatedTeacher.getStatus()
        );

        return teacherRepository.save(existing);
    }

    public void deleteTeacher(Long id) {

        if (!teacherRepository.existsById(id)) {
            throw new RuntimeException(
                    "Teacher not found with id: " + id
            );
        }

        teacherRepository.deleteById(id);
    }
}