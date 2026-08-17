USE kvr_school;

DROP TABLE IF EXISTS fees;

CREATE TABLE fees (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    receipt_no VARCHAR(30) NOT NULL UNIQUE,

    student_id BIGINT NOT NULL,

    class_id BIGINT NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    fee_category ENUM(
        'Admission',
        'Monthly',
        'Quarterly',
        'Half-Yearly',
        'Yearly',
        'Exam',
        'Transport',
        'Hostel',
        'Library',
        'Miscellaneous'
    ) DEFAULT 'Monthly',

    payment_month VARCHAR(20),

    total_fee DECIMAL(10,2) NOT NULL,

    discount DECIMAL(10,2) DEFAULT 0,

    scholarship DECIMAL(10,2) DEFAULT 0,

    late_fee DECIMAL(10,2) DEFAULT 0,

    payable_amount DECIMAL(10,2) NOT NULL,

    paid_amount DECIMAL(10,2) DEFAULT 0,

    pending_amount DECIMAL(10,2) DEFAULT 0,

    payment_date DATE,

    due_date DATE,

    payment_mode ENUM(
        'Cash',
        'UPI',
        'Card',
        'Net Banking',
        'Cheque'
    ) DEFAULT 'Cash',

    transaction_id VARCHAR(100),

    payment_status ENUM(
        'PAID',
        'PARTIAL',
        'PENDING'
    ) DEFAULT 'PENDING',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_fee_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_fee_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)
);