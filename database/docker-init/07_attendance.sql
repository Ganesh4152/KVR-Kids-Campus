USE kvr_school;

DROP TABLE IF EXISTS attendance;

CREATE TABLE attendance (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    attendance_date DATE NOT NULL,

    student_id BIGINT NOT NULL,

    class_id BIGINT NOT NULL,

    teacher_id BIGINT,

    status ENUM(
        'PRESENT',
        'ABSENT',
        'LATE',
        'HALF_DAY',
        'LEAVE'
    ) DEFAULT 'PRESENT',

    check_in_time TIME,

    check_out_time TIME,

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_attendance_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id),

    CONSTRAINT fk_attendance_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)
);