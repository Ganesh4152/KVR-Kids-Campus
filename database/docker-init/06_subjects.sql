USE kvr_school;

DROP TABLE IF EXISTS subjects;

CREATE TABLE subjects (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    subject_code VARCHAR(20) NOT NULL UNIQUE,

    subject_name VARCHAR(100) NOT NULL,

    subject_type ENUM(
        'Language',
        'Core',
        'Practical',
        'Activity',
        'Optional'
    ) DEFAULT 'Core',

    class_id BIGINT NOT NULL,

    teacher_id BIGINT,

    weekly_periods INT DEFAULT 6,

    total_marks INT DEFAULT 100,

    passing_marks INT DEFAULT 35,

    status ENUM('ACTIVE','INACTIVE')
        DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_subject_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id),

    CONSTRAINT fk_subject_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)
);