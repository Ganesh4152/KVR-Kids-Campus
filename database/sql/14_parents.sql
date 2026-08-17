USE kvr_school;

DROP TABLE IF EXISTS parents;

CREATE TABLE parents (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    parent_code VARCHAR(20) NOT NULL UNIQUE,

    father_name VARCHAR(100) NOT NULL,

    mother_name VARCHAR(100),

    guardian_name VARCHAR(100),

    relationship ENUM(
        'Father',
        'Mother',
        'Guardian'
    ) DEFAULT 'Father',

    father_mobile VARCHAR(15) NOT NULL,

    mother_mobile VARCHAR(15),

    alternate_mobile VARCHAR(15),

    father_email VARCHAR(100),

    mother_email VARCHAR(100),

    occupation VARCHAR(100),

    annual_income DECIMAL(12,2),

    aadhaar_number VARCHAR(20),

    address_line1 VARCHAR(255),

    address_line2 VARCHAR(255),

    village VARCHAR(100),

    mandal VARCHAR(100),

    district VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100) DEFAULT 'India',

    pincode VARCHAR(10),

    emergency_contact_name VARCHAR(100),

    emergency_contact_number VARCHAR(15),

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);