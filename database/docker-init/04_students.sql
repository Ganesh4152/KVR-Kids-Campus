USE kvr_school;

DROP TABLE IF EXISTS students;

CREATE TABLE students (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    admission_no VARCHAR(20) NOT NULL UNIQUE,

    roll_no VARCHAR(20) NOT NULL,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50),

    full_name VARCHAR(100) NOT NULL,

    gender ENUM('Male','Female','Other') NOT NULL,

    date_of_birth DATE NOT NULL,

    blood_group VARCHAR(5),

    aadhaar_number VARCHAR(20),

    student_photo VARCHAR(255),

    class_id BIGINT NOT NULL,

    admission_date DATE NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    father_name VARCHAR(100) NOT NULL,

    mother_name VARCHAR(100),

    guardian_name VARCHAR(100),

    parent_mobile VARCHAR(15) NOT NULL,

    alternate_mobile VARCHAR(15),

    parent_email VARCHAR(100),

    occupation VARCHAR(100),

    annual_income DECIMAL(12,2) DEFAULT 0,

    address_line1 VARCHAR(255),

    address_line2 VARCHAR(255),

    village VARCHAR(100),

    mandal VARCHAR(100),

    district VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100) DEFAULT 'India',

    pincode VARCHAR(10),

    bus_required BOOLEAN DEFAULT FALSE,

    bus_route VARCHAR(100),

    pickup_point VARCHAR(100),

    fee_category ENUM(
        'Monthly',
        'Quarterly',
        'Half-Yearly',
        'Yearly'
    ) DEFAULT 'Monthly',

    total_fee DECIMAL(10,2) DEFAULT 0,

    paid_fee DECIMAL(10,2) DEFAULT 0,

    pending_fee DECIMAL(10,2) DEFAULT 0,

    scholarship DECIMAL(10,2) DEFAULT 0,

    hostel_required BOOLEAN DEFAULT FALSE,

    medical_condition VARCHAR(255),

    allergies VARCHAR(255),

    emergency_contact_name VARCHAR(100),

    emergency_contact_number VARCHAR(15),

    previous_school VARCHAR(150),

    tc_number VARCHAR(50),

    remarks TEXT,

    status ENUM(
        'ACTIVE',
        'INACTIVE',
        'TRANSFERRED',
        'COMPLETED'
    ) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_students_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

CREATE INDEX idx_student_class
ON students(class_id);

CREATE INDEX idx_student_mobile
ON students(parent_mobile);

CREATE INDEX idx_student_name
ON students(full_name);

CREATE INDEX idx_student_admission
ON students(admission_no);

SELECT * FROM students;