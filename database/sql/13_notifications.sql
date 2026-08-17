USE kvr_school;

DROP TABLE IF EXISTS notifications;

CREATE TABLE notifications (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    notification_code VARCHAR(30) NOT NULL UNIQUE,

    title VARCHAR(200) NOT NULL,

    message TEXT NOT NULL,

    notification_type ENUM(
        'NOTICE',
        'SMS',
        'EMAIL',
        'PUSH',
        'WHATSAPP'
    ) NOT NULL,

    recipient_type ENUM(
        'ALL',
        'STUDENT',
        'PARENT',
        'TEACHER',
        'ADMIN'
    ) NOT NULL,

    student_id BIGINT NULL,

    teacher_id BIGINT NULL,

    created_by BIGINT,

    scheduled_date DATETIME,

    sent_date DATETIME,

    priority ENUM(
        'LOW',
        'MEDIUM',
        'HIGH',
        'URGENT'
    ) DEFAULT 'MEDIUM',

    delivery_status ENUM(
        'PENDING',
        'SENT',
        'FAILED'
    ) DEFAULT 'PENDING',

    is_active BOOLEAN DEFAULT TRUE,

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_notification_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id),

    CONSTRAINT fk_notification_admin
        FOREIGN KEY (created_by)
        REFERENCES admin(id)

);