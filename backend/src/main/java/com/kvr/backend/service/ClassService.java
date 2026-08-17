package com.kvr.backend.service;

import com.kvr.backend.entity.Class;
import com.kvr.backend.repository.ClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {

    private final ClassRepository classRepository;

    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    public Optional<Class> getClassById(Long id) {
        return classRepository.findById(id);
    }

    public List<Class> getClassesByAcademicYear(String academicYear) {
        return classRepository.findByAcademicYear(academicYear);
    }

    public List<Class> getActiveClasses() {
        return classRepository.findByStatus(
                Class.ClassStatus.ACTIVE
        );
    }

    public Class createClass(Class schoolClass) {

        if (schoolClass.getStatus() == null) {
            schoolClass.setStatus(Class.ClassStatus.ACTIVE);
        }

        if (schoolClass.getCapacity() == null) {
            schoolClass.setCapacity(40);
        }

        return classRepository.save(schoolClass);
    }

    public Optional<Class> updateClass(
            Long id,
            Class updatedClass
    ) {

        return classRepository.findById(id)
                .map(existingClass -> {

                    existingClass.setClassName(
                            updatedClass.getClassName()
                    );

                    existingClass.setSection(
                            updatedClass.getSection()
                    );

                    existingClass.setAcademicYear(
                            updatedClass.getAcademicYear()
                    );

                    existingClass.setClassTeacher(
                            updatedClass.getClassTeacher()
                    );

                    existingClass.setRoomNumber(
                            updatedClass.getRoomNumber()
                    );

                    existingClass.setCapacity(
                            updatedClass.getCapacity()
                    );

                    existingClass.setAgeFrom(
                            updatedClass.getAgeFrom()
                    );

                    existingClass.setAgeTo(
                            updatedClass.getAgeTo()
                    );

                    existingClass.setStatus(
                            updatedClass.getStatus()
                    );

                    return classRepository.save(existingClass);
                });
    }

    public boolean deleteClass(Long id) {

        Optional<Class> schoolClass =
                classRepository.findById(id);

        if (schoolClass.isEmpty()) {
            return false;
        }

        schoolClass.get().setStatus(
                Class.ClassStatus.INACTIVE
        );

        classRepository.save(schoolClass.get());

        return true;
    }
}