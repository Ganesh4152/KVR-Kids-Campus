USE kvr_school;

DROP TABLE IF EXISTS exams;

CREATE TABLE exams (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    exam_code VARCHAR(20) NOT NULL UNIQUE,

    exam_name VARCHAR(100) NOT NULL,

    exam_type ENUM(
        'Unit Test',
        'Monthly',
        'Quarterly',
        'Half-Yearly',
        'Pre-Final',
        'Annual'
    ) NOT NULL,

    class_id BIGINT NOT NULL,

    subject_id BIGINT NOT NULL,

    teacher_id BIGINT,

    academic_year VARCHAR(20) NOT NULL,

    exam_date DATE NOT NULL,

    start_time TIME,

    end_time TIME,

    total_marks INT DEFAULT 100,

    passing_marks INT DEFAULT 35,

    exam_room VARCHAR(30),

    instructions TEXT,

    status ENUM(
        'SCHEDULED',
        'ONGOING',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'SCHEDULED',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_exam_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id),

    CONSTRAINT fk_exam_subject
        FOREIGN KEY (subject_id)
        REFERENCES subjects(id),

    CONSTRAINT fk_exam_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)
);