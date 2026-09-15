USE kvr_school;

DROP TABLE IF EXISTS teachers;

CREATE TABLE teachers (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    employee_id VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50),

    full_name VARCHAR(100) NOT NULL,

    gender ENUM('Male','Female','Other') NOT NULL,

    date_of_birth DATE,

    qualification VARCHAR(150),

    specialization VARCHAR(100),

    experience_years INT DEFAULT 0,

    mobile VARCHAR(15) NOT NULL,

    alternate_mobile VARCHAR(15),

    email VARCHAR(100) UNIQUE,

    aadhaar_number VARCHAR(20) UNIQUE,

    address_line1 VARCHAR(255),

    address_line2 VARCHAR(255),

    village VARCHAR(100),

    mandal VARCHAR(100),

    district VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100) DEFAULT 'India',

    pincode VARCHAR(10),

    joining_date DATE,

    salary DECIMAL(10,2),

    designation VARCHAR(100),

    class_id BIGINT,

    subject VARCHAR(100),

    photo_path VARCHAR(255),

    status ENUM('ACTIVE','INACTIVE','ON_LEAVE','RESIGNED')
        DEFAULT 'ACTIVE',

    emergency_contact_name VARCHAR(100),

    emergency_contact_number VARCHAR(15),

    bank_name VARCHAR(100),

    account_number VARCHAR(30),

    ifsc_code VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_teacher_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)
);