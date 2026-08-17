USE kvr_school;

DROP TABLE IF EXISTS marks;

CREATE TABLE marks (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    student_id BIGINT NOT NULL,

    exam_id BIGINT NOT NULL,

    subject_id BIGINT NOT NULL,

    class_id BIGINT NOT NULL,

    teacher_id BIGINT NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    max_marks INT DEFAULT 100,

    pass_marks INT DEFAULT 35,

    obtained_marks DECIMAL(5,2) NOT NULL,

    percentage DECIMAL(5,2),

    grade VARCHAR(5),

    result ENUM(
        'PASS',
        'FAIL',
        'ABSENT'
    ) DEFAULT 'PASS',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_marks_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_marks_exam
        FOREIGN KEY (exam_id)
        REFERENCES exams(id),

    CONSTRAINT fk_marks_subject
        FOREIGN KEY (subject_id)
        REFERENCES subjects(id),

    CONSTRAINT fk_marks_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id),

    CONSTRAINT fk_marks_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)

);