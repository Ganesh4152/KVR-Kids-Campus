USE kvr_school;

CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobile VARCHAR(15),
    role VARCHAR(20) DEFAULT 'ADMIN',
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO admin
(username,password,full_name,email,mobile)
VALUES
(
'admin',
'admin123',
'School Administrator',
'admin@kvrschool.com',
'7674050823'
);