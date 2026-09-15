USE kvr_school;

DROP TABLE IF EXISTS library;

CREATE TABLE library (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    book_code VARCHAR(30) NOT NULL UNIQUE,

    book_title VARCHAR(200) NOT NULL,

    author_name VARCHAR(150),

    publisher VARCHAR(150),

    isbn VARCHAR(30),

    category VARCHAR(100),

    edition VARCHAR(30),

    language VARCHAR(50) DEFAULT 'English',

    total_copies INT DEFAULT 1,

    available_copies INT DEFAULT 1,

    shelf_number VARCHAR(30),

    student_id BIGINT,

    issue_date DATE,

    due_date DATE,

    return_date DATE,

    fine_amount DECIMAL(10,2) DEFAULT 0,

    status ENUM(
        'AVAILABLE',
        'ISSUED',
        'RETURNED',
        'LOST'
    ) DEFAULT 'AVAILABLE',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_library_student
        FOREIGN KEY (student_id)
        REFERENCES students(id)

);