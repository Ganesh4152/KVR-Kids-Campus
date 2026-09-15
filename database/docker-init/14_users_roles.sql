USE kvr_school;

DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- ==========================
-- ROLES TABLE
-- ==========================

CREATE TABLE roles (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    role_name VARCHAR(50) NOT NULL UNIQUE,

    description VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- USERS TABLE
-- ==========================

CREATE TABLE users (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    email VARCHAR(150) UNIQUE,

    mobile VARCHAR(15),

    full_name VARCHAR(150),

    role_id BIGINT NOT NULL,

    student_id BIGINT NULL,

    teacher_id BIGINT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id),

    CONSTRAINT fk_users_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_users_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)
);

-- ==========================
-- USER ROLE HISTORY
-- ==========================

CREATE TABLE user_roles (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,

    role_id BIGINT NOT NULL,

    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    assigned_by BIGINT,

    CONSTRAINT fk_user_role_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_role_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id),

    CONSTRAINT fk_user_role_admin
        FOREIGN KEY (assigned_by)
        REFERENCES admin(id)
);

-- ==========================
-- DEFAULT ROLES
-- ==========================

INSERT INTO roles (role_name, description)
VALUES
('ADMIN','System Administrator'),
('PRINCIPAL','School Principal'),
('TEACHER','Teacher'),
('STUDENT','Student'),
('PARENT','Parent');

-- ==========================
-- DEFAULT USERS
-- ==========================

INSERT INTO users
(
username,
password,
email,
mobile,
full_name,
role_id
)

VALUES

(
'admin',
'admin123',
'admin@kvrschool.com',
'9876543210',
'System Administrator',
1
),

(
'principal',
'principal123',
'principal@kvrschool.com',
'9876543211',
'School Principal',
2
),

(
'teacher1',
'teacher123',
'teacher1@kvrschool.com',
'9876543212',
'Ravi Kumar',
3
),

(
'student1',
'student123',
'student1@kvrschool.com',
'9876543213',
'Rahul Reddy',
4
);

-- ==========================
-- ROLE ASSIGNMENTS
-- ==========================

INSERT INTO user_roles
(
user_id,
role_id,
assigned_by
)

VALUES

(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1);