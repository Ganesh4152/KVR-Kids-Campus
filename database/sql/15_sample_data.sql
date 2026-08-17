USE kvr_school;

-- ==========================================
-- SAMPLE STUDENTS
-- ==========================================

INSERT INTO students
(
admission_no,
roll_no,
first_name,
last_name,
full_name,
gender,
date_of_birth,
blood_group,
class_id,
admission_date,
academic_year,
father_name,
mother_name,
parent_mobile,
parent_email,
address_line1,
village,
district,
state,
pincode,
fee_category,
total_fee,
paid_fee,
pending_fee
)

VALUES

(
'KVR2026001',
'1',
'Rahul',
'Reddy',
'Rahul Reddy',
'Male',
'2019-06-15',
'O+',
4,
'2026-06-01',
'2026-2027',
'Ramesh Reddy',
'Lakshmi',
'9876543210',
'rahul@example.com',
'Vayalpadu',
'Vayalpadu',
'Annamayya',
'Andhra Pradesh',
'517299',
'Monthly',
30000,
10000,
20000
),

(
'KVR2026002',
'2',
'Sneha',
'Reddy',
'Sneha Reddy',
'Female',
'2018-09-20',
'A+',
5,
'2026-06-01',
'2026-2027',
'Suresh',
'Anitha',
'9123456789',
'sneha@example.com',
'Thamballapalle',
'Vayalpadu',
'Annamayya',
'Andhra Pradesh',
'517299',
'Monthly',
32000,
32000,
0
);

-- ==========================================
-- SAMPLE ATTENDANCE
-- ==========================================

INSERT INTO attendance
(student_id,class_id,attendance_date,status)

VALUES
(1,4,CURDATE(),'PRESENT'),
(2,5,CURDATE(),'ABSENT');

-- ==========================================
-- SAMPLE FEES
-- ==========================================

INSERT INTO fees
(student_id,class_id,academic_year,total_fee,paid_fee,balance_fee,due_date,payment_status)

VALUES

(1,4,'2026-2027',30000,10000,20000,'2026-12-31','PARTIAL'),

(2,5,'2026-2027',32000,32000,0,'2026-12-31','PAID');

-- ==========================================
-- SAMPLE EXAMS
-- ==========================================

INSERT INTO exams
(
exam_code,
exam_name,
exam_type,
class_id,
subject_id,
teacher_id,
academic_year,
exam_date,
start_time,
end_time,
total_marks,
pass_marks,
status
)

VALUES

(
'FA1-G1-MATH',
'Formative Assessment 1',
'FA1',
4,
1,
1,
'2026-2027',
'2026-08-20',
'09:00:00',
'10:30:00',
50,
18,
'SCHEDULED'
);

-- ==========================================
-- SAMPLE MARKS
-- ==========================================

INSERT INTO marks
(
student_id,
exam_id,
subject_id,
teacher_id,
marks_obtained,
grade,
result
)

VALUES

(
1,
1,
1,
1,
45,
'A',
'PASS'
),

(
2,
1,
1,
1,
39,
'B',
'PASS'
);

-- ==========================================
-- SAMPLE LIBRARY
-- ==========================================

INSERT INTO library
(
book_code,
book_title,
author_name,
category,
total_copies,
available_copies,
status
)

VALUES

(
'BK100',
'English Grammar',
'Wren & Martin',
'English',
10,
8,
'AVAILABLE'
),

(
'BK101',
'Science Basics',
'NCERT',
'Science',
15,
12,
'AVAILABLE'
);

-- ==========================================
-- SAMPLE TRANSPORT
-- ==========================================

INSERT INTO transport
(
student_id,
class_id,
academic_year,
bus_number,
vehicle_number,
route_name,
pickup_point,
transport_fee,
payment_status
)

VALUES

(
1,
4,
'2026-2027',
'BUS-01',
'AP39AB1234',
'Vayalpadu Route',
'Bus Stand',
12000,
'PAID'
),

(
2,
5,
'2026-2027',
'BUS-02',
'AP39CD5678',
'Thamballapalle Route',
'Main Road',
12000,
'PARTIAL'
);

-- ==========================================
-- SAMPLE NOTIFICATIONS
-- ==========================================

INSERT INTO notifications
(
notification_code,
title,
message,
notification_type,
recipient_type,
created_by,
priority,
delivery_status
)

VALUES

(
'NOT100',
'School Reopens',
'School will reopen on June 10.',
'NOTICE',
'ALL',
1,
'HIGH',
'SENT'
);

-- ==========================================
-- SAMPLE USERS
-- ==========================================

INSERT INTO users
(
username,
password,
email,
full_name,
role_id
)

VALUES

(
'teacher2',
'teacher123',
'teacher2@kvr.com',
'Anitha Teacher',
3
),

(
'student2',
'student123',
'student2@kvr.com',
'Sneha Reddy',
4
);