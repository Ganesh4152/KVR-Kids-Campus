USE kvr_school;

DROP TABLE IF EXISTS classes;

CREATE TABLE classes
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    class_name VARCHAR(30) NOT NULL,

    section VARCHAR(10) NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    age_from INT,

    age_to INT,

    capacity INT DEFAULT 40,

    class_teacher VARCHAR(100),

    room_number VARCHAR(20),

    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO classes
(
class_name,
section,
academic_year,
age_from,
age_to,
capacity,
class_teacher,
room_number
)
VALUES

('Nursery','A','2026-2027',3,4,30,'','N-101'),

('LKG','A','2026-2027',4,5,30,'','LKG-101'),

('UKG','A','2026-2027',5,6,30,'','UKG-101'),

('1st Class','A','2026-2027',6,7,40,'Ramesh Kumar','101'),

('2nd Class','A','2026-2027',7,8,40,'Lakshmi Devi','102'),

('3rd Class','A','2026-2027',8,9,40,'Suresh Reddy','103'),

('4th Class','A','2026-2027',9,10,40,'Anitha Kumari','104'),

('5th Class','A','2026-2027',10,11,40,'Prasad Naidu','105'),

('6th Class','A','2026-2027',11,12,40,'','201'),

('7th Class','A','2026-2027',12,13,40,'','202'),

('8th Class','A','2026-2027',13,14,40,'','203'),

('9th Class','A','2026-2027',14,15,40,'','301'),

('10th Class','A','2026-2027',15,16,40,'','302');

SELECT
id,
class_name,
section,
academic_year
FROM classes;